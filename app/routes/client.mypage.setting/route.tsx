import { ActionFunction, ActionFunctionArgs, LinksFunction, LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import style from './style.css?url';
import { useForm, getFormProps, getInputProps, getFieldsetProps } from '@conform-to/react';
import { LoaderReturnValue, schema } from './type';
import { parseWithZod } from '@conform-to/zod';
import { ActionReturnValue } from '~/common/type';
import * as modelFnCourse from '~/models/fn/course';
import * as modelFnBookingCapacity from '~/models/fn/booking_capacity';
import { capacityInitialValue, timeTable, week } from './const';
import { BOOKING_TYPE } from '~/models/booking';
import { useFormTable } from './hooks';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
];

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json({
      success: false,
      message: 'Something went wrong.',
      submission: submission.reply(),
    });
  }

  const client = await authenticator.isAuthenticated(request, {
    failureRedirect: '/client/login/',
  });

  const existCourses = await modelFnCourse.fetchAll({ client_id: client.id });

  existCourses.forEach(course => {
    const isExist = submission.value.courses.some(newCourse => course.id === Number(newCourse.id));
    if (!isExist) {
      modelFnCourse.remove({ id: course.id });
    }
  });

  await Promise.all(submission.value.courses.map(async submitCourse => {
    const existCourse = await modelFnCourse.fetch({ id: Number(submitCourse.id ?? 0) });

    if (existCourse) {
      await modelFnCourse.update({
        where: {
          id: existCourse.id,
        },
        data: {
          name: submitCourse.name,
          time_range: submitCourse.time_range,
        },
      });
      return;
    }
    await modelFnCourse.create({
      name: submitCourse.name,
      client_id: client.id,
      time_range: submitCourse.time_range
    });
  }));

  const capacityList = await modelFnBookingCapacity.fetchAll({
    client_id: client.id,
    booking_type: BOOKING_TYPE.SINGLE,
  });

  week.map(async day => {
    const capacity = capacityList.filter(cap => cap.day === day.value);
    if (capacity && capacity.length) {
      await modelFnBookingCapacity.update({
        where: {
          id: capacity[0].id,
        },
        data: {
          ...submission.value.capacityList[day.key],
        }
      });
    } else {
      await modelFnBookingCapacity.create({
        client_id: client.id,
        day: day.value,
        booking_type: BOOKING_TYPE.SINGLE,
        ...submission.value.capacityList[day.key],
      });
    }
  });

  const capacityListGroup = await modelFnBookingCapacity.fetchAll({
    client_id: client.id,
    booking_type: BOOKING_TYPE.GROUP,
  });

  week.map(async day => {
    const capacityGroup = capacityListGroup.filter(cap => cap.day === day.value);
    if (capacityGroup && capacityGroup.length) {
      await modelFnBookingCapacity.update({
        where: {
          id: capacityGroup[0].id,
        },
        data: {
          ...submission.value.capacityListGroup[day.key],
        }
      });
    } else {
      await modelFnBookingCapacity.create({
        client_id: client.id,
        day: day.value,
        booking_type: BOOKING_TYPE.GROUP,
        ...submission.value.capacityListGroup[day.key],
      });
    }
  });


  return json({
    success: true,
    message: '',
    submission: submission.reply(),
  });
};

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const client = await authenticator.isAuthenticated(request, {
    failureRedirect: '/client/login/',
  });

  const courses = await modelFnCourse.fetchAll({
    client_id: client.id,
  });

  const capacityList = await modelFnBookingCapacity.fetchAll({
    client_id: client.id,
  });

  const capacityInitialValueSingle = structuredClone(capacityInitialValue)
  const capacityInitialValueGroup = structuredClone(capacityInitialValue);

  week.forEach(day => {
    timeTable.forEach(time => {
      capacityList.forEach(cap => {
        if (cap.day === day.value) {
          if (cap.booking_type === BOOKING_TYPE.SINGLE) {
            capacityInitialValueSingle[day.key][time.key] = cap[time.key];
          } else {
            capacityInitialValueGroup[day.key][time.key] = cap[time.key];
          }
        }
      });
    });
  });

  return json({
    name: client.name,
    courses: courses.map(course => ({ id: course.id, name: course.name, time_range: course.time_range })),
    capacity_list: {
      single: capacityInitialValueSingle,
      group: capacityInitialValueGroup,
    }
  });
};

export default function ClientMypageSetting() {
  const data = useLoaderData<typeof loader>() as LoaderReturnValue;
  const submission = useActionData<typeof action>() as ActionReturnValue;
  const { onChangeColNumber, onChangeRowNumber } = useFormTable();

  const [form,
    {
    beforeValue,
    name,
    courses,
    capacityList,
    capacityListGroup,
  }
] = useForm({
    lastResult: submission?.submission,
    defaultValue: {
      beforeValue: JSON.stringify(data),
      name: data.name,
      courses: data.courses,
      capacityList: data.capacity_list.single,
      capacityListGroup: data.capacity_list.group,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: 'onSubmit',
  });

  const courseList = courses.getFieldList();

  return (
    <>
      <div className="pa-wrapper">
        <div className="pa-inner">
          <Form method='post' {...getFormProps(form)}>
            <input {...getInputProps(beforeValue, { type: 'hidden' })} />
            {beforeValue.errors && (
              <p className="pa-global-errors">{beforeValue.errors}</p>
            )}
            <div className="pa-form-items">
              <div className="pa-form-item-unit">

                <div className="pa-form-item">
                  <label htmlFor='name' className="pa-form-item__label">Store Name</label>
                  <input className="pa-form-item__input" {...getInputProps(name, { type: 'text' })} />
                </div>

                <div className="pa-form-item">
                  <label htmlFor='course' className="pa-form-item__label">Course Name and time(min)</label>
                  {courseList.map((item, index) => {
                    const fieldItem = item.getFieldset();
                    return (
                      <fieldset key={index} className="pa-unit" {...getFieldsetProps(item)}>
                        <input {...getInputProps(fieldItem.id, { type: 'hidden' })} />
                        <input className="pa-unit-input" {...getInputProps(fieldItem.name, { type: 'text' })} />
                        {fieldItem.name.errors && (
                          <div className="pa-errors">
                            <p className="pa-error">{fieldItem.name.errors.map(i => i)}</p>
                          </div>
                        )}
                        <input className="pa-unit-number" {...getInputProps(fieldItem.time_range, { type: 'text' })} />
                        {fieldItem.time_range.errors && (
                          <div className="pa-errors">
                            <p className="pa-error">{fieldItem.time_range.errors.map(i => i)}</p>
                          </div>
                        )}
                        <button
                          className="pa-unit-delete-btn"
                          {...form.remove.getButtonProps({
                            name: courses.name,
                            index,
                          })}
                        >Delete</button>
                      </fieldset>
                    );
                  })}
                  <button
                    className="pa-unit-add-btn"
                    {...form.insert.getButtonProps({
                      name: courses.name,
                    })}
                  >Add</button>

                </div>
              </div>

              <div className="pa-form-item-unit">
                <div className="pa-form-item">
                  <h2 className="pa-form-item__heading">Seat at the bar</h2>
                  <div className="pa-form-item__table-inner">
                    <table className="pa-form-table">
                      <thead>
                        <tr>
                          <td colSpan={2}></td>
                          {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                            <td key={day}>
                              <input
                                type="number"
                                data-day={`single-${day}`}
                                min={0}
                                onChange={onChangeRowNumber}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td colSpan={2}></td>
                          {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                            <td key={day}>{day}</td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {timeTable.map(time => (
                          <tr key={time.key}>
                            <td>
                              <input type="number" data-time={`single-${time.key}`} min={0} onChange={onChangeColNumber} />
                            </td>
                            <td className="pa-form-table-time-heading">
                              <span>{time.heading}</span>
                            </td>
                            {week.map((day, index) => {
                              return (
                                <td key={index}>
                                  <input
                                    {...getInputProps(capacityList.getFieldset()[day.key].getFieldset()[time.key],
                                    { type: 'number' })}
                                    min={0}
                                    data-target-time={`single-${time.key}`}
                                    data-target-day={`single-${day.key}`}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pa-form-item">
                  <h2 className="pa-form-item__heading">Table seat</h2>
                  <div className="pa-form-item__table-inner">
                    <table className="pa-form-table">
                      <thead>
                        <tr>
                          <td colSpan={2}></td>
                          {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                            <td key={day}>
                              <input
                                type="number"
                                data-day={`group-${day}`}
                                min={0}
                                onChange={onChangeRowNumber}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td colSpan={2}></td>
                          {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                            <td key={day}>{day}</td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {timeTable.map(time => (
                          <tr key={time.key}>
                            <td>
                              <input type="number" data-time={`group-${time.key}`} min={0} onChange={onChangeColNumber} />
                            </td>
                            <td>{time.heading}</td>
                            {week.map((day, index) => {
                              return (
                                <td key={index}>
                                  <input
                                    {...getInputProps(capacityListGroup.getFieldset()[day.key].getFieldset()[time.key],
                                    { type: 'number' })}
                                    min={0}
                                    data-target-time={`group-${time.key}`}
                                    data-target-day={`group-${day.key}`}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
            <button className="pa-form-btn">Save</button>

          </Form>
        </div>
      </div>
    </>
  );
}

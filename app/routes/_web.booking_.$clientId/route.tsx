import { useEffect } from 'react';
import { useLoaderData, Form, useActionData, useSearchParams } from '@remix-run/react';
import { LoaderFunction, LoaderFunctionArgs, ActionFunction, ActionFunctionArgs, json, LinksFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { parseWithZod } from '@conform-to/zod';
import { getCollectionProps, getFormProps, getInputProps, getSelectProps, useForm } from '@conform-to/react';
import { timePointArray } from '~/utilis/classes/overlap/const';
import { BaseModal } from '~/components/modal/base_modal/base_modal';
import { ActionReturnValue } from '~/common/type';
import { MODAL_KEY, MODAL_STATE } from '~/components/modal/base_modal/const';
import { NUMBER_OF_PEOPLE, BOOKING_TYPE, COURSE, SCHEDULE, MODAL_KIND, MAIL_ID } from './const';
import { Time } from '~/utilis/classes/time';
import { TIME_VALUE_OBJECT_DETAILED } from '../_web.booking_.$clientId.scheduleApi/const';
import { useBooking } from './hooks';
import type { LoaderReturnValue } from './type';
import { schema } from './schema';
import { getClientData } from './service.server';
import style from './style.css?url';
import { actionServer } from './action/action.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style }
];

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.clientId, 'Missing params');
  const data = await getClientData({ clientId: params.clientId });

  return json(data);
};

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.clientId, 'Missing params');
  const formData = await request.clone().formData();
  const url = new URL(request.url);

  return await actionServer({ formData, clientId: params.clientId, url: url.host });
};

export default function WebBookingClientId() {
  const { client, courses } = useLoaderData<typeof loader>() as LoaderReturnValue;
  const result = useActionData<typeof action>() as ActionReturnValue;
  const [, setSearchParams] = useSearchParams();

  const {
    onHandleNumberOfPeople,
    onHandleBookingType,
    onHandleCourse,
    onHandleDate,
    onHandleDateTime,
    schedule,
    searchParams,
    courseTime,
    emailContent,
  } = useBooking({ client, courses });

  useEffect(() => {
    if (!result?.success) {
      return;
    }

    if (result.modalKind === MODAL_KIND.CONFIRM) {
      setSearchParams(prev => {
        prev.set(MODAL_KEY, MODAL_STATE.OPEN);
        prev.set(MODAL_KIND.KEY, MODAL_KIND.CONFIRM);
        return prev;
      });
    }

    if (result.modalKind === MODAL_KIND.EMAIL_SENT) {
      setSearchParams(prev => {
        prev.set(MODAL_KEY, MODAL_STATE.OPEN);
        prev.set(MODAL_KIND.KEY, MODAL_KIND.EMAIL_SENT);
        prev.set(MAIL_ID.KEY, String(result?.mailResult ?? ''));
        return prev;
      });
    }

  }, [result]);

  const [ form, {
    'number-of-people': numberOfPeopleField,
    'type': bookingTypeField,
    course: courseField,
    'schedule': bookingField,
    'full-name': fullNameField,
    email: emailField,
  } ] = useForm({
    defaultValue: {
      'number-of-people': searchParams.get(NUMBER_OF_PEOPLE.KEY) || undefined,
      'type': searchParams.get(BOOKING_TYPE.KEY) || BOOKING_TYPE.SINGLE,
      course: searchParams.get(COURSE.KEY) || courses[0]?.id,
      'schedule': searchParams.get(SCHEDULE.KEY),
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  return (
    <>
      {result?.message && (
        <p>{result.message}</p>
      )}
      <main className="main">
        <h1 className="pa-heading">Booking for {client.name}</h1>

        <Form className="pa-form" method='post' {...getFormProps(form)}>
          <input type="hidden" name="client-id" value={client.id} />

          <fieldset className="pa-form-item pa-form-item--nop">
            <div className="pa-form-item__inner">
              <label htmlFor={numberOfPeopleField.id} className="pa-form-item-heading">予約人数</label>
              <select
                {...getSelectProps(numberOfPeopleField)}
                onChange={onHandleNumberOfPeople}
                className="pa-form-item__select"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            {numberOfPeopleField.errors && (
              <p className="pa-form-item-error">{numberOfPeopleField.errors}</p>
            )}
          </fieldset>

          <fieldset className="pa-form-item">
            <div className="pa-form-item__inner">
              <p className="pa-form-item-heading">席</p>
              <div className="pa-form-radio-items">
                {[
                  { label: 'カウンター', value: BOOKING_TYPE.SINGLE },
                  { label: 'テーブル', value: BOOKING_TYPE.GROUP }
                ].map(type => (
                  <div key={type.value} className="pa-form-radio-item">
                    <input
                      type="radio"
                      name={bookingTypeField.name}
                      id={type.value}
                      value={type.value}
                      onChange={onHandleBookingType}
                      className="pa-form-radio-item__input"
                    />
                    <label htmlFor={type.value} className="pa-form-radio-item__label">{type.label}</label>
                  </div>
                ))}
              </div>
            </div>
            {bookingTypeField.errors && (
              <p className="pa-form-item-error">{bookingTypeField.errors}</p>
            )}
          </fieldset>

          <fieldset className="pa-form-item">
            <label htmlFor="course" className="pa-form-item-heading">コース選択</label>
            <select {...getSelectProps(courseField)} onChange={onHandleCourse} className="pa-form-item__select">
              <option value="">選択してください</option>
              {courses.map(item => (
                <option
                  key={item.id}
                  value={item.id}
                  defaultValue={item.id}
                  data-time={item.time_range}
                >{`${item.name}（${item.time_range}）分`}</option>
              ))}
            </select>
            {courseField.errors && (
              <p className="pa-form-item-error">{courseField.errors}</p>
            )}
          </fieldset>

          <fieldset className="pa-form-item">
            <div className="pa-form-item__inner">
              <label htmlFor="date" className="pa-form-item-heading">日付選択</label>
              <input type="date" name="date" onChange={onHandleDate} className="pa-form-item__input pa-form-item__date"/>
            </div>
          </fieldset>

          <div className="pa-form-item-table-wrapper">
            <fieldset className="pa-form-table-item">
              {bookingField.errors && (
                <p className="pa-form-item-error">{bookingField.errors}</p>
              )}
            {schedule.state === 'idle' && schedule.data ? (
              <table className="pa-form-table">
                <thead>
                  <tr>
                    <td className="pa-time-table-heading"></td>
                    {schedule.data.map(day => (
                      <td key={day.day} className="pa-time-table-heading">
                        <div className="pa-time-table-heading__date">{day.date}</div>
                        <div className="pa-time-table-heading__day">{day.day}</div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timePointArray.map((time, index) => (
                    <tr key={time}>
                      <td className="pa-time-table-scale">
                        <div className={`pa-time-table-scale-inner ${index % 4 === 0 ? 'pa-time-table-scale-inner--large' : ''}`}>{`${time}`}</div>
                      </td>
                      {getCollectionProps(bookingField, {
                        type: 'radio',
                        options: schedule.data ? schedule.data.map(timeList => `${timeList.date}-${time}`) : [],
                      }).map((item, childIndex) => {
                        const numberOfPeople = searchParams.get('number-of-people');
                        const isOK = schedule.data && schedule.data[childIndex].schedule[time].remain - Number(numberOfPeople) < 0;
                        const timeObj = new Time(time);
                        const isNG = [...Array(courseTime / 15 - 1)].some(() => {
                          timeObj.add(TIME_VALUE_OBJECT_DETAILED[15 as keyof typeof TIME_VALUE_OBJECT_DETAILED]);
                          if (!timeObj.isValidTime()) {
                            return true;
                          }
                          return schedule.data && schedule.data[childIndex].schedule[timeObj.display()].remain - Number(numberOfPeople) < 0;
                        });
                        return (
                          <td key={childIndex}>
                            <div className="pa-time-table-input">
                              <input
                                {...item}
                                disabled={isNG}
                                id={`id-${index}-${childIndex}`}
                                onChange={onHandleDateTime}
                                className={`${isOK ? 'is-ng' : ''}`}
                              />
                              <label htmlFor={`id-${index}-${childIndex}`}>{time}</label>
                              <div
                                className="pa-time-table-booking"
                                style={{ height: courseTime * 2 + 'px' }}
                              ></div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : schedule.state === 'loading' ? (
              <p>Loading...</p>
            ) : (
              <p></p>
            )}
            </fieldset>
          </div>

          <button
            type="submit"
            name="intent"
            value="confirm"
            className="pa-confirm-btn"
          >送信</button>

          <BaseModal>
            {searchParams.get(MODAL_KIND.KEY) === MODAL_KIND.CONFIRM && (
              <>
                <p className="pa-modal-intro">予約を確定しますか？</p>
                <div className="pa-modal-items">
                  <fieldset className="pa-modal-item">
                    <label htmlFor={fullNameField.id}>氏名</label>
                    <input {...getInputProps(fullNameField, { type: 'text' })} />
                  </fieldset>

                  <fieldset className="pa-modal-item">
                    <label htmlFor={emailField.id}>メールアドレス</label>
                    <input {...getInputProps(emailField, { type: 'email' })} />
                  </fieldset>

                  <button
                    type="submit"
                    name="intent"
                    value="finish"
                    className="pa-modal-submit"
                  >予約</button>
                </div>
              </>
            )}
            {searchParams.get(MODAL_KIND.KEY) === MODAL_KIND.EMAIL_SENT && (
              <>
                <p className="pa-modal-intro">入力したメールアドレスに確認メールを送信しました。</p>
                <div className="pa-modal-note">
                  <p className="pa-modal-note__text">※メールの内容は以下です。<br />プロトタイプなのでメールの内容を表示しています。</p>
                  <p className="pa-modal-note__email"><a href={`${emailContent.data}`} target="_blank" rel="noreferrer">{emailContent.data}</a></p>
                </div>
              </>
            )}
          </BaseModal>

        </Form>
      </main>
    </>
  );
}

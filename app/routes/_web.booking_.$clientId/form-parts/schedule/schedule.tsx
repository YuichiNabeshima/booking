import { useLoaderData } from '@remix-run/react';
import { getCollectionProps } from '@conform-to/react';
import { timePointArray } from '~/utilis/classes/overlap/const';
import type { LoaderReturn, Schedule } from '../../type';
import type { FormProps } from '../type';
import { useSchedule } from './hooks';
import { loader } from '../../route';

export function Schedule({ field }: FormProps) {
  const { client } = useLoaderData<typeof loader>() as LoaderReturn;

  const {
    onHandleSchedule,
    schedule,
    courseTime,
    isHidden,
    isDisable,
  } = useSchedule(client);

  return (
    <div className="pa-form-item-table-wrapper">
      <fieldset className="pa-form-table-item">
        {field.errors && (
          <p className="pa-form-item-error">{field.errors}</p>
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
                {getCollectionProps(field, {
                  type: 'radio',
                  options: schedule.data ? schedule.data.map(timeList => `${timeList.date}-${time}`) : [],
                }).map((item, dayIndex) => (
                  <td key={dayIndex}>
                    <div className="pa-time-table-input">
                      <input
                        {...item}
                        disabled={isDisable({ dayIndex, time })}
                        id={`id-${index}-${dayIndex}`}
                        onChange={onHandleSchedule}
                        className={`${isHidden({ dayIndex, time }) ? 'is-hidden' : ''}`}
                      />
                      <label htmlFor={`id-${index}-${dayIndex}`}>{time}</label>
                      <div
                        className="pa-time-table-booking"
                        style={{ height: courseTime * 2 + 'px' }}
                      ></div>
                    </div>
                  </td>
                ))}
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
  );
}

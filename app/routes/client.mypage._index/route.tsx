import { LinksFunction, LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import * as modelFnBooking from '~/models/fn/booking';
import * as modelFnCourse from '~/models/fn/course';
import * as modelFnUser from '~/models/fn/user';
import style from './style.css?url';
import { timePointArray } from '~/utilis/classes/overlap/const';
import { Time } from '~/utilis/classes/time';
import { TIME_VALUE_OBJECT_DETAILED } from '../_web.booking_.$clientId.scheduleApi/const';
import { BOOKING_TYPE } from '~/models/booking';
import { BaseModal } from '~/components/modal/base_modal/base_modal';
import { useMypageIndex } from './hooks';
import { useBaseModal } from '~/components/modal/base_modal/hook';
import { useMQ } from '~/hooks/media-query';

export type LoaderReturns = {
  bookings: {
    start: string;
    nop: number;
    type: string;
    courseName: string;
    courseTime: string;
    userName: string;
    userEmail: string;
  }[],
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
];

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const client = await authenticator.isAuthenticated(request, {
    failureRedirect: '/client/login/',
  });

  const url = new URL(request.url);
  const dateParam = url.searchParams.get('date');
  const date = dateParam ? new Date(dateParam) : new Date();

  const bookings = await modelFnBooking.fetchAll({
    client_id: client.id,
    date: new Date(date),
  });

  const bookingsDetail = await Promise.all(bookings.map(async booking => {
    const course = await modelFnCourse.fetch({ id: booking.course_id });
    const user = await modelFnUser.fetch({ id: booking.user_id });

    return {
      start: booking.start,
      nop: booking.number_of_people,
      type: booking.type === BOOKING_TYPE.GROUP ? BOOKING_TYPE.GROUP : BOOKING_TYPE.SINGLE,
      courseName: course?.name,
      courseTime: course?.time_range,
      userName: user?.name,
      userEmail: user?.email,
    };
  }));

  return json({
    bookings: bookingsDetail,
  });
};

function isBookingZone(start: string, range: string) {
  return [...Array(Number(range) / 15).keys()].map(num => {
    return new Time(start).add(TIME_VALUE_OBJECT_DETAILED[(num) * 15 as keyof typeof TIME_VALUE_OBJECT_DETAILED]).display();
  });
}

export default function ClientMypageIndex() {
  const { bookings } = useLoaderData<typeof loader>() as LoaderReturns;
  const { onHandleClick, modalInfo } = useMypageIndex();
  const { isShow } = useBaseModal();
  const { isPC } = useMQ();

  return (
    <>
      <div className="pa-info">
        <Form className="pa-form">
          <dl className="pa-form-unit">
            <dt className="pa-form-unit__heading">Date</dt>
            <dd className="pa-form-unit__body">
              <input type="date" name="date" />
            </dd>
          </dl>
          <button type="submit" className="pa-form-submit">Submit</button>
        </Form>
      </div>
      <div className="pa-wrapper">
        <table className="pa-table">
          <tbody>
            <tr>
              <th className="pa-table-heading">{isPC && 'Name'}</th>
              {timePointArray.map((time, index) => (
                <th key={index}>
                  {index % 4 === 0 && (
                    <div className="pa-time-heading">{time}</div>
                  )}
                </th>
              ))}
            </tr>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                data-key={index}
                data-start={booking.start}
                data-nop={booking.nop}
                data-type={booking.type}
                data-course-name={booking.courseName}
                data-course-time={booking.courseTime}
                data-user-name={booking.userName}
                data-user-email={booking.userEmail}
                onClick={onHandleClick}
              >
                <td className="pa-user">{booking.userName}</td>
                {timePointArray.map((time, childIndex) => (
                  <td key={childIndex} className={`time time-${time}`}>
                    {isBookingZone(booking.start, booking.courseTime).includes(time) && (
                      <div key={index} className="pa-item"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isShow && (
        <BaseModal>
          <div className="pa-modal">
            <dl className="pa-modal-unit">
              <dt className="pa-modal-unit__heading">Name</dt>
              <dd className="pa-modal-unit__body">{modalInfo.name}</dd>
            </dl>
            <dl className="pa-modal-unit">
              <dt className="pa-modal-unit__heading">Email</dt>
              <dd className="pa-modal-unit__body">{modalInfo.email}</dd>
            </dl>
            <dl className="pa-modal-unit">
              <dt className="pa-modal-unit__heading">Start</dt>
              <dd className="pa-modal-unit__body">{modalInfo.start}</dd>
            </dl>
            <dl className="pa-modal-unit">
              <dt className="pa-modal-unit__heading">Course</dt>
              <dd className="pa-modal-unit__body">{modalInfo.courseName}({modalInfo.courseTime}min)</dd>
            </dl>
            <dl className="pa-modal-unit">
              <dt className="pa-modal-unit__heading">Type of seat</dt>
              <dd className="pa-modal-unit__body">{BOOKING_TYPE.GROUP === modalInfo.type ? 'Seat at the bar' : 'Table seat'}</dd>
            </dl>
            <dl className="pa-modal-unit">
              <dt className="pa-modal-unit__heading">Number of people</dt>
              <dd className="pa-modal-unit__body">{modalInfo.nop}</dd>
            </dl>
          </div>
        </BaseModal>
      )}
    </>
  );
}

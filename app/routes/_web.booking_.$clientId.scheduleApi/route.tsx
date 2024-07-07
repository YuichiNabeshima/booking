import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { getBookingStateOfWeek } from './services/get_booking_state_of_week';
import { BOOKING_TYPE } from '~/models/booking';

export const WEEK = {
  0: 'mon',
  1: 'tue',
  2: 'wed',
  3: 'thu',
  4: 'fri',
  5: 'sat',
  6: 'sun',
};

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  invariant(params.clientId, 'Missing params');

  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const date = url.searchParams.get('date');
  const courseId = url.searchParams.get('course');

  if (!type || !date || !courseId) {
    return '';
  }

  const typeUpperCase = type.toUpperCase();

  if (!Object.values(BOOKING_TYPE).includes(typeUpperCase as keyof typeof BOOKING_TYPE)) {
    return '';
  }

  const result = await getBookingStateOfWeek({
    clientId: Number(params.clientId),
    type: typeUpperCase as keyof typeof BOOKING_TYPE,
    date,
    course: Number(courseId),
  });

  return json(result);
  };

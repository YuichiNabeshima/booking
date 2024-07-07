import { BOOKING_TYPE } from '~/models/booking';
import * as modelFnBooking from '~/models/fn/booking';
import * as modelFnBookingCapacity from '~/models/fn/booking_capacity';
import * as modelFnCourse from '~/models/fn/course';
import { getThisWeek } from '~/utilis/schedule';
import { TimePointValue } from '~/utilis/classes/overlap/overlap';
import { DAY_OF_VALUE, WEEK } from '../const';
import { getAvailableScheduleOfDay } from '../services/get_available_schedule_of_day';

export type StateOfDay = {
  isAvailable: boolean;
  remain: number;
};

export type DayOfWeek =(typeof WEEK)[number];

export type Week = {
  [day in DayOfWeek]: {
    [key in TimePointValue]: StateOfDay;
  }
};

type Args = {
  clientId: number;
  type: keyof typeof BOOKING_TYPE;
  date: string;
  course: number;
};

export async function getBookingStateOfWeek({
  clientId,
  type,
  date,
  course: courseId,
}: Args) {

  const thisWeek = getThisWeek(date);

  const bookings = await modelFnBooking.fetchAll({
    client_id: clientId,
    type: type,
    OR: thisWeek.map(day => ({
      date: new Date(day),
    })),
  });

  const capacity_list = await modelFnBookingCapacity.fetchAll({
    client_id: clientId,
    booking_type: type,
  });

  const course = await modelFnCourse.fetch({
    id: courseId,
  });

  if (!course) {
    throw new Error('コースが未選択です');
  }

  const courses = await modelFnCourse.fetchAll({ client_id: clientId });

  const week = thisWeek.map((dayTimeStamp, index) => {

    const bookingOfDay = bookings.filter(booking => {
      return booking.date.getDay() === new Date(dayTimeStamp).getDay();
    });
    const capacityOfDay = capacity_list.filter(capacity => {
      return capacity.day === DAY_OF_VALUE[new Date(dayTimeStamp).getDay() as keyof typeof DAY_OF_VALUE];
    });
    const scheduleOfDay = getAvailableScheduleOfDay({ bookings: bookingOfDay, capacityList: capacityOfDay, courses, bookingType: type });

    return {
      'day': WEEK[index as keyof typeof WEEK],
      'date': `${new Date(dayTimeStamp).getFullYear()}/${new Date(dayTimeStamp).getMonth() + 1}/${new Date(dayTimeStamp).getDate() + 1}`,
      schedule: {...scheduleOfDay},
    };
  });

  return week;
}

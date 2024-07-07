import type { Booking, BookingType } from '~/models/booking';
import type { BookingCapacity } from '~/models/booking_capacity';
import type { Course } from '~/models/course';
import { Overlap, TimePointValue } from '~/utilis/classes/overlap/overlap';
import { Time } from '~/utilis/classes/time';
import { TIME_VALUE_OBJECT } from '../const';
import { timePointArray } from '~/utilis/classes/overlap/const';
import { initialScheduleOfDay } from './const';

type Args = {
  bookings: Booking[];
  capacityList: BookingCapacity[];
  courses: Course[];
  bookingType: BookingType;
};

export function getAvailableScheduleOfDay({ bookings, capacityList, courses, bookingType }: Args) {
  const courseObj: { [courseId: number]: Course } = {};
  courses.forEach(course => {
    courseObj[course.id] = course;
  });

  const overlap = new Overlap({ bookingType });
  overlap.add(bookings.map(
    booking => {
      const endTime = new Time(booking.start);
      endTime.add(TIME_VALUE_OBJECT[Number(courseObj[booking.course_id].time_range) as keyof typeof TIME_VALUE_OBJECT])

    return {
      start: booking.start as TimePointValue,
      end: endTime.display(),
      numberOfPeople: booking.number_of_people,
    };
  }));

  overlap.addCapacity(capacityList);

  const scheduleObj: { [key in TimePointValue]: { isAvailable: boolean; remain: number } } = initialScheduleOfDay;

  timePointArray.forEach(time => {
    scheduleObj[time] = {
      isAvailable: overlap.isAvailable(time),
      remain: overlap.getRemain(time),
    };
  });

  return scheduleObj;
}

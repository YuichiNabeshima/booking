import { useState, useEffect } from 'react';
import { useFetcher, useSearchParams } from '@remix-run/react';
import { LoaderReturnValue, Schedule } from './type';
import { COURSE, NUMBER_OF_PEOPLE, BOOKING_TYPE, SCHEDULE, DATE, MAIL_ID } from './const';

export function useBooking({ client }: LoaderReturnValue) {

  const schedule = useFetcher<Schedule>();
  const emailContent = useFetcher<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseTime, setCourseTime] = useState<number>(0);

  useEffect(() => {
    const numberOfPeople = document.querySelector(`[name="${NUMBER_OF_PEOPLE.KEY}"]`);
    const bookingType = document.querySelectorAll(`[name="${BOOKING_TYPE.KEY}"]`);
    const course = document.querySelector(`[name="${COURSE.KEY}"]`);
    const date = document.querySelector(`[name="${DATE.KEY}"]`);

    const numberOfPeopleParam = searchParams.get(NUMBER_OF_PEOPLE.KEY);
    const bookingTypeParam = searchParams.get(BOOKING_TYPE.KEY);
    const courseParam = searchParams.get(COURSE.KEY);
    const dateParam = searchParams.get(DATE.KEY);

    const select = document.querySelector<HTMLSelectElement>('select[name="course"]');
    const time = select?.options[select.selectedIndex].getAttribute('data-time');
    setCourseTime(Number(time));

    if (numberOfPeople instanceof HTMLInputElement) {
      numberOfPeople.value = numberOfPeopleParam || '';
    }

    [...bookingType].forEach(type => {
      if (type instanceof HTMLInputElement) {
        if (type.value === bookingTypeParam) {
          type.checked = true;
        } else {
          type.checked = false;
        }
      }
    });

    if (course instanceof HTMLSelectElement) {
      course.value = courseParam || '';
    }

    if (date instanceof HTMLInputElement) {
      date.value = dateParam || '';
    }

    if (!dateParam || !courseParam) {
      return;
    }

    schedule.load(`/booking/${client.id}/scheduleApi?type=${bookingTypeParam}&date=${dateParam}&course=${courseParam}`);
  }, [searchParams.get(NUMBER_OF_PEOPLE.KEY), searchParams.get(BOOKING_TYPE.KEY), searchParams.get(COURSE.KEY), searchParams.get(DATE.KEY)]);

  useEffect(() => {
    const date = document.querySelectorAll(`[name="${SCHEDULE.KEY}"]`);
    const dateParam = searchParams.get(SCHEDULE.KEY);

    [...date].forEach(day => {
      if (day instanceof HTMLInputElement) {
        if (day.value === dateParam && !day.disabled) {
          day.checked = true;
        } else {
          day.checked = false;
        }
      }
    });
  }, [schedule]);

  useEffect(() => {
    emailContent.load(`/mailApi?mail-id=${searchParams.get(MAIL_ID.KEY)}`)
  }, [searchParams.get(MAIL_ID.KEY)]);

  const onHandleNumberOfPeople = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prev => {
      prev.set(NUMBER_OF_PEOPLE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  const onHandleBookingType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set(BOOKING_TYPE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  const onHandleCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prev => {
      prev.set(COURSE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });


    const time = e.target.options[e.target.selectedIndex].getAttribute('data-time');
    setCourseTime(Number(time) * 2);
  };

  const onHandleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set(DATE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  const onHandleDateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set(SCHEDULE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  return {
    schedule,
    onHandleNumberOfPeople,
    onHandleBookingType,
    onHandleCourse,
    onHandleDate,
    onHandleDateTime,
    searchParams,
    courseTime,
    emailContent,
  };
}

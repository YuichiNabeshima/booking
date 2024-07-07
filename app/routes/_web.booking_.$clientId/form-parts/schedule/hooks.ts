import { useState, useEffect } from 'react';
import type { Client } from '~/models/client';
import { useFetcher, useSearchParams } from '@remix-run/react';
import { Schedule } from '../../type';
import { COURSE, NUMBER_OF_PEOPLE, BOOKING_TYPE, DATE, SCHEDULE } from '../../const';
import { timePointArray } from '~/utilis/classes/overlap/const';
import { TIME_VALUE_OBJECT_DETAILED } from '~/routes/_web.booking_.$clientId.scheduleApi/const';
import { Time } from '~/utilis/classes/time';

export function useSchedule(client: Client) {
  const schedule = useFetcher<Schedule>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseTime, setCourseTime] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);

  useEffect(() => {
    const course = document.querySelector<HTMLSelectElement>(`[name="${COURSE.KEY}"]`);

    const numberOfPeopleParam = searchParams.get(NUMBER_OF_PEOPLE.KEY);
    const bookingTypeParam = searchParams.get(BOOKING_TYPE.KEY);
    const courseParam = searchParams.get(COURSE.KEY);
    const dateParam = searchParams.get(DATE.KEY);

    setNumberOfPeople(Number(numberOfPeopleParam));

    const time = course?.options[course.selectedIndex]?.getAttribute('data-time');
    setCourseTime(Number(time));

    if (!numberOfPeopleParam || !bookingTypeParam || !dateParam || !courseParam) {
      schedule.data = undefined;
      return;
    }

    schedule.load(`/booking/${client.id}/scheduleApi?type=${bookingTypeParam}&date=${dateParam}&course=${courseParam}`);
  }, [
    searchParams.get(NUMBER_OF_PEOPLE.KEY),
    searchParams.get(BOOKING_TYPE.KEY),
    searchParams.get(COURSE.KEY),
    searchParams.get(DATE.KEY),
  ]);

  useEffect(() => {
    const date = document.querySelectorAll(`[name="${SCHEDULE.KEY}"]`);
    const scheduleParam = searchParams.get(SCHEDULE.KEY);

    [...date].forEach(day => {
      if (day instanceof HTMLInputElement) {
        if (day.value === scheduleParam && !day.disabled) {
          day.checked = true;
        } else {
          day.checked = false;
        }
      }
    });
  }, [schedule]);

  function isHidden({ dayIndex, time }: { dayIndex: number, time: typeof timePointArray[number] }) {
    return schedule.data && schedule.data[dayIndex].schedule[time].remain - Number(numberOfPeople) < 0;
  }

  function isDisable({ dayIndex, time, }: { dayIndex: number, time: typeof timePointArray[number] }) {
    const timeObj = new Time(time);

    if (!courseTime) {
      return;
    }

    return [...Array(courseTime / 15 - 1)].some(() => {
      timeObj.add(TIME_VALUE_OBJECT_DETAILED[15 as keyof typeof TIME_VALUE_OBJECT_DETAILED]);
      if (!timeObj.isValidTime()) {
        return true;
      }
      return schedule.data && schedule.data[dayIndex].schedule[timeObj.display() as typeof timePointArray[number]].remain - Number(numberOfPeople) < 0;
    });
  }

  function onHandleSchedule(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setSearchParams(prev => {
        prev.delete(SCHEDULE.KEY);
        return prev;
      })
    }

    setSearchParams(prev => {
      prev.set(SCHEDULE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  }

  return {
    onHandleSchedule,
    schedule,
    courseTime,
    isHidden,
    isDisable,
  };
}

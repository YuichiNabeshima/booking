import { Client } from '~/models/client';
import { Course } from '~/models/course';
import { TimePointValue } from '~/utilis/classes/overlap/overlap';
import { StateOfDay } from '../_web.booking_.$clientId.scheduleApi/service.server';

export type LoaderReturnValue = {
  client: Client;
  courses: Course[];
};

export type Day = {
  [key in TimePointValue]: StateOfDay;
};

export type Schedule = [
  {
    'day': 'mon',
    'date': string,
    'schedule': Day,
  },
  {
    'day': 'tue',
    'date': string,
    'schedule': Day,
  },
  {
    'day': 'wed',
    'date': string,
    'schedule': Day,
  },
  {
    'day': 'thu',
    'date': string,
    'schedule': Day,
  },
  {
    'day': 'fri',
    'date': string,
    'schedule': Day,
  },
  {
    'day': 'sat',
    'date': string,
    'schedule': Day,
  },
  {
    'day': 'sun',
    'date': string,
    'schedule': Day,
  },
];

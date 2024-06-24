import { DayOfWeek } from '~/models/booking_capacity';
import { CapacityList } from './type';

export const timeTable: {
  heading: string;
  key: 'time_11_12' | 'time_12_13' | 'time_13_14' | 'time_14_15' | 'time_15_16' | 'time_16_17' | 'time_17_18' | 'time_18_19' | 'time_19_20' | 'time_20_21' | 'time_21_22' | 'time_22_23';
}[] = [
  {
    heading: '11-12',
    key:     'time_11_12',
  },
  {
    heading: '12-13',
    key:     'time_12_13',
  },
  {
    heading: '13-14',
    key:     'time_13_14',
  },
  {
    heading: '14-15',
    key:     'time_14_15',
  },
  {
    heading: '15-16',
    key:     'time_15_16',
  },
  {
    heading: '16-17',
    key:     'time_16_17',
  },
  {
    heading: '17-18',
    key:     'time_17_18',
  },
  {
    heading: '18-19',
    key:     'time_18_19',
  },
  {
    heading: '19-20',
    key:     'time_19_20',
  },
  {
    heading: '20-21',
    key:     'time_20_21',
  },
  {
    heading: '21-22',
    key:     'time_21_22',
  },
  {
    heading: '22-23',
    key:     'time_22_23',
  },
];

export const week: {
  heading: 'Mon' | 'Tue'| 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  key: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  value: keyof typeof DayOfWeek;
}[] = [
  {
    heading: 'Mon',
    key    : 'mon',
    value  : DayOfWeek.MON,
  },
  {
    heading: 'Tue',
    key    : 'tue',
    value  : DayOfWeek.TUE,
  },
  {
    heading: 'Wed',
    key    : 'wed',
    value  : DayOfWeek.WED,
  },
  {
    heading: 'Thu',
    key    : 'thu',
    value  : DayOfWeek.THU,
  },
  {
    heading: 'Fri',
    key    : 'fri',
    value  : DayOfWeek.FRI,
  },
  {
    heading: 'Sat',
    key    : 'sat',
    value  : DayOfWeek.SAT,
  },
  {
    heading: 'Sun',
    key    : 'sun',
    value  : DayOfWeek.SUN,
  },
];

export const capacityInitialValue: CapacityList = {
  mon: {
    time_11_12: 0,
    time_12_13: 0,
    time_13_14: 0,
    time_14_15: 0,
    time_15_16: 0,
    time_16_17: 0,
    time_17_18: 0,
    time_18_19: 0,
    time_19_20: 0,
    time_20_21: 0,
    time_21_22: 0,
    time_22_23: 0,
  },
  tue: {
    time_11_12: 0,
    time_12_13: 0,
    time_13_14: 0,
    time_14_15: 0,
    time_15_16: 0,
    time_16_17: 0,
    time_17_18: 0,
    time_18_19: 0,
    time_19_20: 0,
    time_20_21: 0,
    time_21_22: 0,
    time_22_23: 0,
  },
  wed: {
    time_11_12: 0,
    time_12_13: 0,
    time_13_14: 0,
    time_14_15: 0,
    time_15_16: 0,
    time_16_17: 0,
    time_17_18: 0,
    time_18_19: 0,
    time_19_20: 0,
    time_20_21: 0,
    time_21_22: 0,
    time_22_23: 0,
  },
  thu: {
    time_11_12: 0,
    time_12_13: 0,
    time_13_14: 0,
    time_14_15: 0,
    time_15_16: 0,
    time_16_17: 0,
    time_17_18: 0,
    time_18_19: 0,
    time_19_20: 0,
    time_20_21: 0,
    time_21_22: 0,
    time_22_23: 0,
  },
  fri: {
    time_11_12: 0,
    time_12_13: 0,
    time_13_14: 0,
    time_14_15: 0,
    time_15_16: 0,
    time_16_17: 0,
    time_17_18: 0,
    time_18_19: 0,
    time_19_20: 0,
    time_20_21: 0,
    time_21_22: 0,
    time_22_23: 0,
  },
  sat: {
    time_11_12: 0,
    time_12_13: 0,
    time_13_14: 0,
    time_14_15: 0,
    time_15_16: 0,
    time_16_17: 0,
    time_17_18: 0,
    time_18_19: 0,
    time_19_20: 0,
    time_20_21: 0,
    time_21_22: 0,
    time_22_23: 0,
  },
  sun: {
    time_11_12: 0,
    time_12_13: 0,
    time_13_14: 0,
    time_14_15: 0,
    time_15_16: 0,
    time_16_17: 0,
    time_17_18: 0,
    time_18_19: 0,
    time_19_20: 0,
    time_20_21: 0,
    time_21_22: 0,
    time_22_23: 0,
  },
};

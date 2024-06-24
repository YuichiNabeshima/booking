import { BookingCapacity } from '@prisma/client';

const DayOfWeek = {
  MON: "MON",
  TUE: "TUE",
  WED: "WED",
  THU: "THU",
  FRI: "FRI",
  SAT: "SAT",
  SUN: "SUN",
} as const;

const BookingType = {
  SINGLE: "SINGLE",
  GROUP: "GROUP",
};

export type { BookingCapacity };
export { DayOfWeek, BookingType };

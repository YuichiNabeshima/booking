import type { Booking } from '@prisma/client';

export const BOOKING_TYPE = {
  SINGLE: 'SINGLE',
  GROUP: 'GROUP',
} as const;

export type BookingType = keyof typeof BOOKING_TYPE;

export { Booking };

import { BOOKING_TYPE as BOOKING_TYPE_CONST } from '~/models/booking';

export const NUMBER_OF_PEOPLE = {
  KEY: 'number-of-people',
};

export const BOOKING_TYPE = {
  KEY: 'type',
  ...BOOKING_TYPE_CONST,
};

export const COURSE = {
  KEY: 'course',
};

export const DATE = {
  KEY: 'date',
};

export const SCHEDULE = {
  KEY: 'schedule',
};

export const MODAL_KIND = {
  KEY: 'modal-kind',
  CONFIRM: 'confirm',
  EMAIL_SENT: 'email-sent',
} as const;

export const MAIL_ID = {
  KEY: 'mail-id',
};

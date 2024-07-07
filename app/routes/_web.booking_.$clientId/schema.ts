import { z } from 'zod';
import { BOOKING_TYPE } from '~/models/booking';

export const schema = z
  .object({
    'number-of-people': z
      .number({ required_error: 'It is required field.', message: 'It is invalid value.' })
      .max(4, { message: 'Please choose less than 5 people.' })
      ,
    'type': z
      .union([
        z.literal(BOOKING_TYPE.SINGLE),
        z.literal(BOOKING_TYPE.GROUP),
      ])
      ,
    course: z
      .number({ required_error: 'It is required field.', message: 'It is invalid value.' }),
    schedule: z
      .string({ required_error: 'It is required field.' })
      ,
    'full-name': z
      .string({ message: 'It is invalid value.' })
      .optional()
      ,
    email: z
      .string()
      .email({ message: 'It is invalid email.' })
      .optional()
      ,
    intent: z
      .enum(['confirm', 'finish'])
      ,
  })
  .refine(val => {
    if (val.intent === 'confirm') {
      return true;
    }
    if (val.intent === 'finish' && val['full-name']) {
      return true;
    }
    return false;
  }, {
    path: ['full-name'],
    message: 'It is required.',
  })
  .refine(val => {
    if (val.intent === 'confirm') {
      return true;
    }
    if (val.intent === 'finish' && val.email) {
      return true;
    }
    return false;
  }, {
    path: ['email'],
    message: 'It is required.',
  })
  ;

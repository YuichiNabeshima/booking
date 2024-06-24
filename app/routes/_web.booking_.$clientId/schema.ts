import { z } from 'zod';
import { BOOKING_TYPE } from '~/models/booking';

export const schema = z
  .object({
    'number-of-people': z
      .number({ required_error: '人数は入力必須です', message: '人数の値が不正です' })
      .max(6, { message: '人数は6人以下で入力してください' })
      ,
    'type': z
      .union([
        z.literal(BOOKING_TYPE.SINGLE),
        z.literal(BOOKING_TYPE.GROUP),
      ])
      ,
    course: z
      .number({ required_error: 'コースは入力必須です', message: 'コースの値が不正です' }),
    'schedule': z
      .string({ required_error: '予約時間は必須入力です' })
      ,
    'full-name': z
      .string({ message: '氏名が不正です' })
      .optional()
      ,
    email: z
      .string()
      .email({ message: 'メールアドレスの形式で入力してください' })
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
    message: '氏名は入力必須です',
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
    message: 'メールアドレスは入力必須です',
  })
  ;

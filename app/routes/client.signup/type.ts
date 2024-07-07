import { z } from 'zod';

export const schema = z.object({
  name: z
    .string({ required_error: 'This field is required.' })
    ,
  email: z
    .string({ required_error: 'This field is required.' })
    .email()
    ,
  password: z
    .string({ required_error: 'This field is required.' })
    .regex(/^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/, { message: 'Please enter in half-width alphanumeric characters.' })
    .min(8, { message: 'Please enter password more than 8 characters.' })
    ,
  passwordConfirm: z
    .string({ required_error: 'This field is required.' })
    .min(8, { message: 'Please enter in more than 8 characters.' })
    ,
})
.superRefine(({ password, passwordConfirm }, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      path: ['passwordConfirm'],
      code: 'custom',
      message: 'Confirmation password id not match.',
    });
  }
})
;

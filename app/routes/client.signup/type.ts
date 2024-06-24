import { z } from 'zod';

export const schema = z.object({
  name: z
    .string({ required_error: '店名は入力必須です' })
    ,
  email: z
    .string({ required_error: 'メールアドレスは入力必須です' })
    .email()
    ,
  password: z
    .string({ required_error: 'パスワードは入力必須です' })
    .regex(/^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/, { message: 'パスワードは半角英数字混合で入力してください' })
    .min(8, { message: 'パスワードは8文字以上入力してください' })
    ,
  passwordConfirm: z
    .string({ required_error: '確認用パスワードは入力必須です' })
    .min(8, { message: '確認用パスワードは8文字以上入力してください' })
    ,
})
.superRefine(({ password, passwordConfirm }, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      path: ['passwordConfirm'],
      code: 'custom',
      message: '確認用パスワードが一致していません',
    });
  }
})
;

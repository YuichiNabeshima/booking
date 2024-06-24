import { z } from 'zod';


export const schema = z.object({
  email: z
    .string({ required_error: 'メールアドレスは入力必須です' })
    .email({ message: 'メールアドレスの形式で入力してください' })
    ,
  password: z
    .string({ required_error: 'パスワードは入力必須です' })
    ,
})
;

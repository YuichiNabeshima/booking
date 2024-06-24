import { json } from '@remix-run/node';
import { parseWithZod } from '@conform-to/zod';
import bcrypt from 'bcryptjs';
import { authenticator } from '~/services/auth.server';
import { schema } from './type';
import * as modelFnClient from '~/models/fn/client';

export async function clientLogin(formData: FormData, request: Request) {
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json({
      success: false,
      message: 'エラーがあります',
      submission: submission.reply(),
    });
  }

  const user = await modelFnClient.fetch({email: submission.value.email});

  if (!user) {
    return json({
      success: false,
      message: 'メールアドレスとパスワードが一致しません',
      submission: submission.reply(),
    });
  }

  const passwordMatch = await bcrypt.compare(submission.value.password, user.password)

  if (passwordMatch) {
  return await authenticator.authenticate('client-login', request, {
    successRedirect: '/client/mypage/',
  });
  }

  return json({
    success: false,
    message: 'メールアドレスとパスワードが一致しません',
    submission: submission.reply(),
  });
}

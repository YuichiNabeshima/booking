import { json } from '@remix-run/node';
import { parseWithZod } from '@conform-to/zod';
import bcrypt from 'bcryptjs';
import * as modelFnClient from '~/models/fn/client';
import { authenticator } from '~/services/auth.server';
import { schema } from './type';

export async function clientSignup(formData: FormData, request: Request) {
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json({
      success: false,
      message: 'Something went wrong.',
      submission: submission.reply(),
    });
  }

  if (await modelFnClient.fetch({email: submission.value.email})) {
    return json({
      success: false,
      message: 'Something went wrong.',
      submission: submission.reply({
        fieldErrors: {
          email: ['Email already exists.'],
        }
      }),
    });
  }

  const passwordHash = await bcrypt.hash(submission.value.password, 12)

  const newClient = await modelFnClient.create({
    name: submission.value.name,
    email: submission.value.email,
    password: passwordHash,
  });

  if (!newClient) {
    return json({
      success: false,
      message: 'Something went wrong.',
    });
  }

  const result = await authenticator.authenticate('client-login', request, {
    successRedirect: '/client/mypage/',
  });

  if (!result) {
    return json({
      success: false,
      message: 'Something went wrong.',
    });
  }
}

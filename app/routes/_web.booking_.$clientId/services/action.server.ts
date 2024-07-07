import { json } from '@remix-run/node';
import jwt from 'jsonwebtoken';
import { parseWithZod } from '@conform-to/zod';
import { schema } from '../schema';
import * as modelFnMailQue from '~/models/fn/mail_que';
import { MODAL_KIND } from '../const';

export async function getActionData({ formData, clientId, url }: { formData: FormData, clientId: string, url: string }) {

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json({
      success: false,
      message: 'Something went wrong',
      submission: submission.reply(),
    });
  }

  if (submission.value.intent === 'confirm') {
    return json({
      success: true,
      modalKind: MODAL_KIND.CONFIRM,
      submission: submission.reply(),
    });
  }

  const updates = Object.fromEntries(formData);

  if (!(typeof updates['schedule'] === 'string')) {
    return json({
      success: false,
      message: 'Something went wrong',
      submission: submission.reply(),
    });
  }

  const token = jwt.sign({
    nop: updates['number-of-people'],
    type: updates['type'],
    course: updates.course,
    schedule: updates['schedule'],
    name: updates['full-name'],
    email: updates.email,
  },
  process.env.TOKEN_KEY as string,
  {
    expiresIn: 72000,
    algorithm: 'HS256',
  });

  const mailResult = await modelFnMailQue.create({
    to: updates.email as string,
    from: 'booking@gmail.com',
    title: 'test',
    body: `Please confirm your booking from a link below.
    URL:
    ${url}/booking/${clientId}/confirm?token=${token}
    `,
  });

  return json({
    success: true,
    modalKind: MODAL_KIND.EMAIL_SENT,
    submission: submission.reply(),
    mailResult: mailResult.id,
  });
}

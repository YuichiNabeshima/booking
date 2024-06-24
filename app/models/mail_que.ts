import type { MailQue } from '@prisma/client';
import * as modelFnMailQue from './fn/mail_que';
import nodemailer from 'nodemailer';

export { MailQue };

type AddMailQue = {
  to: string;
  from?: string;
  title: string;
  body: string;
};

export function addMailQue(args: AddMailQue) {
  const result = modelFnMailQue.create({
    to: args.to,
    from: args.from || '',
    title: args.title,
    body: args.body,
  });
  return result;
}

export async function sendEmail(id: number) {
  const mailQue = await modelFnMailQue.fetch({ id });

  if (!mailQue) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const mailBody = {
    from: mailQue.from ?? 'booking.from@gmail.com',
    to: mailQue.to,
    subject: mailQue.title,
    text: mailQue.body,
  };
  transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info}`);
    }
  })
}

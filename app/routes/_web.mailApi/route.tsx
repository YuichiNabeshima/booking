import { LoaderFunction, json } from '@remix-run/node';
import { MAIL_ID } from '../_web.booking_.$clientId/const';
import * as ModelFnMailQue from '~/models/fn/mail_que';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get(MAIL_ID.KEY);
  if (Number(id)) {
    const mail_que = await ModelFnMailQue.fetch({ id: Number(id) })

    return json(mail_que?.body);
  }
  return '';
};

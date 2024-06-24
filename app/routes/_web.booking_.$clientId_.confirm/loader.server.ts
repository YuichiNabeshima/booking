import { json } from '@remix-run/node';
import jwt from 'jsonwebtoken';
import * as modelFnClient from '~/models/fn/client';
import * as modelFnCourse from '~/models/fn/course';
import { BOOKING_TYPE } from '~/models/booking';

export type DecodedReturns = {
  nop: string;
  type: string;
  course: string;
  schedule: string;
  name: string;
  email: string;
};

type Args = {
  requestUrl: string;
  clientId: string;
};

export async function loaderServer({ requestUrl, clientId }: Args) {
  const url = new URL(requestUrl);
  const token = url.searchParams.get('token');

  let decoded;
  let errorMsg = '';
  try {
    if (!token) {
      throw new Error('Missing token');
    }
    decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as DecodedReturns;
  } catch(e) {
    if (e instanceof jwt.TokenExpiredError) {
      errorMsg = '有効期限が切れています';
    } else if (e instanceof jwt.JsonWebTokenError) {
      errorMsg = '不正なトークンです';
    }
  }

  if (!decoded || errorMsg) {
    return json({
      result: {},
      errorMsg,
    });
  }

  const client = await modelFnClient.fetch({
    id: Number(clientId),
  });

  const course = await modelFnCourse.fetch({
    id: Number(decoded.course),
  });

  return json({
    result: {
      clientName: client?.name,
      nop: decoded.nop,
      type: decoded.type === BOOKING_TYPE.GROUP ? 'テーブル' : 'カウンター',
      course: `${course?.name}(${course?.time_range}min)`,
      date: decoded.schedule?.substring(0, decoded.schedule.indexOf('-')),
      start: decoded.schedule?.substring(decoded.schedule.indexOf('-') + 1),
      name: decoded.name,
      email: decoded.email,
    },
    errorMsg,
  });
}

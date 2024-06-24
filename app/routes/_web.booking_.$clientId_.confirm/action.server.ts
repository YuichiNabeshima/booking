import jwt from 'jsonwebtoken';
import { json, redirect } from '@remix-run/node';
import { BOOKING_TYPE } from '~/models/booking';
import * as modelFnBooking from '~/models/fn/booking';
import * as modelFnUser from '~/models/fn/user';
import * as modelFnMailQue from '~/models/fn/mail_que';
import * as modelFnClient from '~/models/fn/client';
import * as modelFnCourse from '~/models/fn/course';
import { User } from '~/models/user';

export async function actionServer({ request, clientId }: {
  request: {
    formData: FormData;
    url: string;
    origin: string;
  },
  clientId: string;
}) {

  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  let decoded;
  let errorMsg = '';

  try {
    if (!token) {
      throw new Error('Missing token');
    }
    decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as {nop: string, type: string, course: string, schedule: string, name: string, email: string};
  } catch(e) {
    if (e instanceof jwt.TokenExpiredError) {
      errorMsg = '有効期限が切れています';
    } else if (e instanceof jwt.JsonWebTokenError) {
      errorMsg = '不正なトークンです';
    }
  }

  if (!decoded) {
    errorMsg = 'デコードが空です';
  }

  if (errorMsg || !decoded) {
    return json({
      actionErrorMsg: errorMsg,
    });
  }

  if (request.formData.get('cancel')) {
    const url = new URL(`/booking/${clientId}/`, request.origin ?? '');
    url.searchParams.set('number-of-people', decoded.nop);
    url.searchParams.set('type', decoded.type);
    url.searchParams.set('course', decoded.course);
    url.searchParams.set('schedule', decoded.schedule);

    return redirect(`/booking/${clientId}/?${url.searchParams.toString()}`);
  }

  const user = await modelFnUser.fetch({
    email: decoded.email,
  });

  let newUser: User | null = null;
  if (!user) {
    newUser = await modelFnUser.create({
      name: decoded.name,
      email: decoded.email,
    });
  } else {
    newUser = await modelFnUser.update({
      where: {
        id: user.id,
      },
      data: {
        name: decoded.name,
      }
    })
  }

  if (!newUser && !user) {
    return json({
      errorMsg: '予約に失敗しました',
    });
  }

  const client = await modelFnClient.fetch({
    id: Number(clientId),
  });

  const course = await modelFnCourse.fetch({
    id: Number(decoded.course),
  });

  const bookingTime = decoded.schedule.substring(decoded.schedule.indexOf('-') + 1);

  modelFnBooking.create({
    user_id: user?.id ?? newUser.id,
    client_id: Number(clientId),
    course_id: Number(decoded.course),
    start: bookingTime,
    number_of_people: Number(decoded.nop),
    date: new Date(new Date(decoded.schedule).setHours(new Date(decoded.schedule).getHours() - 7)),
    type: decoded.type === BOOKING_TYPE.GROUP ? BOOKING_TYPE.GROUP : BOOKING_TYPE.SINGLE,
  });

  modelFnMailQue.create({
    to: decoded.email,
    from: 'from@gmail.com',
    title: `予約しました`,
    body: `予約内容
    店舗: ${client?.name}
    日時: ${decoded.schedule}
    コース: ${course?.name}
    氏名: ${user?.name ?? newUser.name}
    メールアドレス: ${user?.email ?? newUser.email}
    `,
  });

  return redirect('/');
}

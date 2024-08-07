import { json } from '@remix-run/node';
import * as modelFnClient from '~/models/fn/client';
import * as modelFnCourse from '~/models/fn/course';

export async function getLoaderData({ clientId }: { clientId: string }) {
  const cid =Number(clientId);
  const client = await modelFnClient.fetch({
    id: cid,
  });

  const courses = await modelFnCourse.fetchAll({
    client_id: cid,
  });

  return json({
    client,
    courses,
  });
}

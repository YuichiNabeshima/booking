import { Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node'
import { authenticator } from '~/services/auth.server';
import Header from './header/header';

export type LoaderReturns = {
  client: {
    id: number;
    name: string;
    email: string;
    password: string;
    supportSingle: boolean;
    supportGroup: boolean;
    capacityOfGroup: number;
  },
};

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const client = await authenticator.isAuthenticated(request, {
    failureRedirect: '/client/login/',
  });

  return json({ client: {
    id: client.id,
    name: client.name,
    email: client.email,
  } });
};

export default function ClientMypage() {
  const { client } = useLoaderData<typeof loader>() as LoaderReturns

  return (
    <>
      <Header />
      <section className="pa-client-info">
        <h1 className="pa-client-info__heading">{client.name}</h1>
        <dl className="pa-info-unit">
          <dt className="pa-info-unit__heading">Email</dt>
          <dd className="pa-info-unit__body">{client.email}</dd>
        </dl>
      </section>
      <Outlet />
    </>
  );
}

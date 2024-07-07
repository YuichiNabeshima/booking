import { ActionFunction, LoaderFunction, LoaderFunctionArgs, ActionFunctionArgs, LinksFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { loaderServer } from './loader.server';
import { actionServer } from './action.server';
import style from './style.css?url';

export type LoaderReturns = {
  result: {
    clientName: string;
    nop: string;
    type: string;
    course: string;
    date: string;
    start: string;
    name: string;
    email: string;
  },
  errorMsg: string,
};

export type ActionReturns = {
  actionErrorMsg: string;
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
];

export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.clientId, 'Missing params');

  return loaderServer({ requestUrl: request.url, clientId: params.clientId });
};

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs ) => {
  invariant(params.clientId, 'Missing params');

  const formData = await request.clone().formData();

  return await actionServer({ request: {
    formData: formData,
    url: request.url,
    origin: request.headers.get('origin') ?? '',
  },
  clientId: params.clientId,
  });
};

export default function Index() {
  const { result, errorMsg } = useLoaderData<typeof loader>() as LoaderReturns;
  const actionErrorMsg = useActionData<typeof action>() as ActionReturns | null;

  return (
    <main className="main">
      <h2 className={`pa-heading ${errorMsg ? 'has-error' : ''}`}>{!errorMsg ? 'Would you like to confirm your booking?' : errorMsg}</h2>
      {actionErrorMsg?.actionErrorMsg && (
        <div className="pa-error">{actionErrorMsg.actionErrorMsg}</div>
      )}
      {!errorMsg && (
        <div className="pa-detail">
          <h3 className="pa-detail-heading">Booking details</h3>
          <div className="pa-detail-content">
            <dl className="pa-detail-unit">
              <dt className="pa-detail-unit__heading">Name</dt>
              <dd className="pa-detail-unit__body">{result.name}</dd>
            </dl>
            <dl className="pa-detail-unit">
              <dt className="pa-detail-unit__heading">Email</dt>
              <dd className="pa-detail-unit__body">{result.email}</dd>
            </dl>
            <dl className="pa-detail-unit">
              <dt className="pa-detail-unit__heading">Store</dt>
              <dd className="pa-detail-unit__body">{result.clientName}</dd>
            </dl>
            <dl className="pa-detail-unit">
              <dt className="pa-detail-unit__heading">Date</dt>
              <dd className="pa-detail-unit__body">{result.date}/{result.start}</dd>
            </dl>
            <dl className="pa-detail-unit">
              <dt className="pa-detail-unit__heading">Course</dt>
              <dd className="pa-detail-unit__body">{result.course}</dd>
            </dl>
            <dl className="pa-detail-unit">
              <dt className="pa-detail-unit__heading">Type of seat</dt>
              <dd className="pa-detail-unit__body">{result.type}</dd>
            </dl>
            <dl className="pa-detail-unit">
              <dt className="pa-detail-unit__heading">Number of people</dt>
              <dd className="pa-detail-unit__body">{result.nop}</dd>
            </dl>
          </div>
        </div>
      )}
      {!errorMsg && (
        <Form method='post'>
          <div className="pa-btns">
            <button
              type="submit"
              name="submit"
              value="1"
              className="pa-submit pa-btn"
            >Submit</button>
            <button
              type="submit"
              name="cancel"
              value="1"
              className="pa-cancel pa-btn"
            >Cancel</button>
          </div>
        </Form>
      )}
    </main>
  );
}

import { ActionFunction, LoaderFunction, LoaderFunctionArgs, ActionFunctionArgs, LinksFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { loaderServer } from './services/loader.server';
import { getActionServer } from './services/action.server';
import { LoaderReturn, ActionReturn } from './type';
import style from './index.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
];

export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.clientId, 'Missing params');

  return await loaderServer({ requestUrl: request.url, clientId: params.clientId });
};

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs ) => {
  invariant(params.clientId, 'Missing params');

  return await getActionServer({
    request,
    clientId: params.clientId,
  });
};

export default function Index() {
  const { result, errorMsg } = useLoaderData<typeof loader>() as LoaderReturn;
  const actionErrorMsg = useActionData<typeof action>() as ActionReturn | null;

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

import { useLoaderData, Form, useActionData } from '@remix-run/react';
import { LoaderFunction, LoaderFunctionArgs, ActionFunction, ActionFunctionArgs, json, LinksFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { parseWithZod } from '@conform-to/zod';
import { getFormProps, useForm } from '@conform-to/react';
import { ActionReturnValue } from '~/common/type';
import type { LoaderReturnValue } from './type';
import { schema } from './schema';
import { getLoaderData } from './services/loader.server';
import { getActionData } from './services/action.server';
import styles from './styles.css?url';
import { NumberOfPeople } from './form-parts/number-of-people/number-of-people';
import { TypeOfSeat } from './form-parts/type-of-seat/type-of-seat';
import { Course } from './form-parts/course/course';
import { Date } from './form-parts/date/date';
import { Schedule } from './form-parts/schedule/schedule';
import { Modal } from './modal/modal';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.clientId, 'Missing params');
  const data = await getLoaderData({ clientId: params.clientId });

  return json(data);
};

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.clientId, 'Missing params');
  const formData = await request.clone().formData();
  const url = new URL(request.url);

  return await getActionData({ formData, clientId: params.clientId, url: url.origin });
};

export default function WebBookingClientId() {
  const { client, courses } = useLoaderData<typeof loader>() as LoaderReturnValue;
  const result = useActionData<typeof action>() as ActionReturnValue;

  const [ form, {
    'number-of-people': numberOfPeopleField,
    'type': bookingTypeField,
    course: courseField,
    'schedule': bookingField,
    'full-name': fullNameField,
    email: emailField,
  } ] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  return (
    <>
      {result?.message && (
        <p>{result.message}</p>
      )}
      <main className="main">
        <h1 className="pa-heading">Booking for {client.name}</h1>

        <Form className="pa-form" method='post' {...getFormProps(form)}>
          <input type="hidden" name="client-id" value={client.id} />

          <NumberOfPeople field={numberOfPeopleField} />

          <TypeOfSeat field={bookingTypeField} />

          <Course field={courseField} courses={courses} />

          <Date />

          <Schedule {...{field: bookingField}} />

          <button
            type="submit"
            name="intent"
            value="confirm"
            className="pa-confirm-btn"
          >Submit</button>

          <Modal {...{fullNameField, emailField}} />

        </Form>
      </main>
    </>
  );
}

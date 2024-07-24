import { Form, useActionData, Link } from '@remix-run/react';
import { ActionFunction, ActionFunctionArgs, LinksFunction, MetaFunction } from '@remix-run/node';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { schema } from './type';
import { clientSignup } from './service.server';
import type { ActionReturn } from '~/common/type';
import style from './style.css?url';

export const meta: MetaFunction = () => [
  { title: 'Registration client store', },
  {
    name: 'description',
    content: 'This page is a registration page.',
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
];

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  return clientSignup(formData, request);
};

export default function ClientSignup() {
  const data = useActionData<typeof action>() as ActionReturn | undefined;

  const [form, { name, email, password, passwordConfirm }] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  return (
    <>
      <div className="pa-wrapper">
        <div className="pa-inner">
          <h1 className="pa-heading">Register client</h1>
          <Form method='post' className="pa-form" {...getFormProps(form)}>
            {data && data.message && (
              <p className="pa-global-msg">{data.message}</p>
            )}
            <div className="pa-form-items">
              <div className="pa-form-item">
                <label className="pa-form-item__label" htmlFor="client-name">Name of restaurant</label>
                <input className="pa-form-item__input" {...getInputProps(name, { type: 'text' })} required />
                {name.errors && (
                  <div className="pa-errors">
                    {name.errors.map((error, i) => (
                      <p key={i} className="pa-error">{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="pa-form-item">
                <label className="pa-form-item__label" htmlFor="email">Email</label>
                <input className="pa-form-item__input" {...getInputProps(email, { type: 'email' })} />
                {email.errors && (
                  <div className="pa-errors">
                    {email.errors.map((error, i) => (
                      <p key={i} className="pa-error">{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="pa-form-item">
                <label className="pa-form-item__label" htmlFor="password">Password</label>
                <input className="pa-form-item__input" {...getInputProps(password, { type: 'password' })} />
                {password.errors && (
                  <div className="pa-errors">
                    {password.errors.map((error, i) => (
                      <p key={i} className="pa-error">{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="pa-form-item">
                <label className="pa-form-item__label" htmlFor="password-confirm">Password confirmation</label>
                <input className="pa-form-item__input" {...getInputProps(passwordConfirm, { type: 'password' })} />
                {passwordConfirm.errors && (
                  <div className="pa-errors">
                    {passwordConfirm.errors.map((error, i) => (
                      <p key={i} className="pa-error">{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button className="pa-form-btn">Registration</button>
            <div className="pa-form-link-wrapper">
              <Link to={`/client/login/`} className="pa-form-link">Log in</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

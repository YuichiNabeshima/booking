import { ActionFunction, ActionFunctionArgs, LinksFunction, LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData, Link } from '@remix-run/react';
import { useForm, getFormProps, getInputProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { authenticator } from '~/services/auth.server';
import { ActionReturn } from '~/common/type';
import { schema } from './type';
import { clientLogin } from './service.server';
import style from './style.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
];

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: '/client/mypage/',
  });
  return user;
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  return clientLogin(formData, request);
};

export default function ClientLogin() {
  const data = useActionData<typeof action>() as ActionReturn;

  const [form, { email, password }] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema })
    },
  });

  return (
    <>
      <div className="pa-wrapper">
        <div className="pa-inner">
          <h1 className="pa-heading">Login as client.</h1>
          <Form method='post' className={`pa-form ${data && !data.success ? 'has-error' : ''}`} {...getFormProps(form)}>
            {data && data.message && (
              <p className="pa-global-msg">{data.message}</p>
            )}
            <div className="pa-form-items">

              <div className={`pa-form-item ${email.errors ? 'is-error' : ''}`}>
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

              <div className={`pa-form-item ${password.errors ? 'is-error' : ''}`}>
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
            </div>
            <button className="pa-form-btn">Login</button>
            <div className="pa-form-link-wrapper">
              <Link to={`/client/signup/`} className="pa-form-link">Sign up</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

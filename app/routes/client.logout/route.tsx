import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';


export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs ) => {
  const result = await authenticator.logout(request, {
    redirectTo: '/client/login/',
  });
  return result;
};

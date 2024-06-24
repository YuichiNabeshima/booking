import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { FormStrategy } from 'remix-auth-form';
import { Client } from '~/models/client';
import * as modelFnClient from '~/models/fn/client';

export const authenticator = new Authenticator<Client>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email');
    const client = await modelFnClient.fetch({email: String(email)});

    if (!client) {
      throw new Error('ログインに失敗しました');
    }

    return client;
  }),
  'client-login',
);

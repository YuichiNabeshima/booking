import { LinksFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import styles from './style.css?url';
import { links as HeaderLinks } from './header/header';

export const links: LinksFunction = () => [
  ...HeaderLinks(),
  { rel: 'stylesheet', href: styles },
];

export const meta: MetaFunction = () => {
  return [
    { title: "" },
    { name: "description", content: "" },
  ];
};

export default function Index() {
  return (
    <>
      {/* <Header /> */}
      <div className="pa-bg">
        <div className="pa-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

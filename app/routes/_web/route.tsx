import { LinksFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import styles from './style.css?url';

export const links: LinksFunction = () => [
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
      <div className="pa-bg">
        <div className="pa-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

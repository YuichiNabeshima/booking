import { Outlet } from '@remix-run/react';
import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { name: 'robots', content: 'noindex, nofollow' },
];

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

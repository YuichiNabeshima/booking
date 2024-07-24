import { Outlet } from '@remix-run/react';

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

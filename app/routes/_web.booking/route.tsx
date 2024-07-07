import { Outlet } from "@remix-run/react";
import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs) => {
  return params;
};

export default function Index() {
  return (
    <>
      <h1>booking</h1>
      <Outlet />
    </>
  );
}

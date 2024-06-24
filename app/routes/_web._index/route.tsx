import { LinksFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
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
      <main>Top 1</main>
    </>
  );
}

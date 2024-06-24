import type { LinksFunction } from '@remix-run/node';
import styles from './style.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
];

export function Header() {
  return (
    <header className="header">
      <h1 className="header-logo">Booking</h1>
      <nav className="header-nav">
        <a href="/store/" className="header-nav-item">店舗</a>
      </nav>
    </header>
  );
}
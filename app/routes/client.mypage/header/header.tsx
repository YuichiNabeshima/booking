import { Link, useLoaderData } from '@remix-run/react';
import { LoaderReturns, loader } from '../route';
import { useHeader } from './hooks';


export default function Header() {
  const client = useLoaderData<typeof loader>() as LoaderReturns;
  const { onOpenMenu, onCloseMenu, isOpen, } = useHeader();

  return (
    <>
      <div className={`header-container ${isOpen ? 'is-menu-open' : ''}`}>
        <header className={`header`}>
          <div className="header-logo">Booking</div>
          <button className="c-hamburger" onClick={onOpenMenu}>
            <span className="c-hamburger__bar"></span>
            <span className="c-hamburger__bar"></span>
            <span className="c-hamburger__bar"></span>
          </button>
        </header>
        {client && (
          <>
            <div
              className="header-nav__overlay"
              onClick={onCloseMenu}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter')
                  onCloseMenu
              }}></div>
            <nav className="header-nav">
              <Link to={`/client/logout/`} className="header-nav-item header-logout">Logout</Link>
              <Link to={`/client/mypage/`} className="header-nav-item">My page</Link>
              <Link to={`/client/mypage/setting/`} className="header-nav-item">Setting</Link>
            </nav>
          </>
        )}
      </div>
    </>
  );
}

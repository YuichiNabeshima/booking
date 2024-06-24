import { useSearchParams } from '@remix-run/react';
import { HEADER_MENU } from './const';

export function useHeader() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get(HEADER_MENU.KEY) === HEADER_MENU.OPEN;

  const onOpenMenu = () => {
    setSearchParams(prev => {
      if (prev.get(HEADER_MENU.KEY) === HEADER_MENU.OPEN) {
        prev.delete(HEADER_MENU.KEY);
        return prev;
      }

      prev.set(HEADER_MENU.KEY, HEADER_MENU.OPEN);
      return prev;
    })
  };

  const onCloseMenu = () => {
    setSearchParams(prev => {
      prev.delete(HEADER_MENU.KEY, HEADER_MENU.OPEN);
      return prev;
    })
  };

  return {
    isOpen,
    onOpenMenu,
    onCloseMenu,
  };
}

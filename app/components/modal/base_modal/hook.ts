import { useSearchParams } from '@remix-run/react';
import { MODAL_KEY, MODAL_STATE } from './const';

type Args = {
  isDefaultShow?: boolean;
};

export function useBaseModal(args?: Args) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isShow = searchParams.get(MODAL_KEY) === MODAL_STATE.OPEN;

  const onHandleClose = () => {
    setSearchParams(prev => {
      prev.delete(MODAL_KEY);
      return prev;
    });
  };

  const onHandleOpen = () => {
    setSearchParams(prev => {
      prev.set(MODAL_KEY, MODAL_STATE.OPEN);
      return prev;
    });
  };

  return {
    isShow,
    onHandleOpen,
    onHandleClose,
  };
}

import { useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MODAL_KEY, MODAL_STATE } from '~/components/modal/base_modal/const';

const BOOKING_KEY = 'booking';

export function useMypageIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalInfo, setModalInfo] = useState({
    name: '',
    email: '',
    nop: '',
    type: '',
    start: '',
    courseName: '',
    courseTime: '',
  });

  useEffect(() => {
    const params = searchParams.get(BOOKING_KEY);
    const el = document.querySelector(`[data-key="${params}"]`);

    if (!el) {
      return;
    }

    setModalInfo({
      name: el.getAttribute('data-user-name') ?? '',
      email: el.getAttribute('data-user-email') ?? '',
      nop: el.getAttribute('data-nop') ?? '',
      type: el.getAttribute('data-type') ?? '',
      start: el.getAttribute('data-start') ?? '',
      courseName: el.getAttribute('data-course-name') ?? '',
      courseTime: el.getAttribute('data-course-time') ?? '',
    });
  }, [searchParams]);

  const onHandleClick = (e: React.MouseEvent<HTMLElement>) => {
    setSearchParams(prev => {
      prev.set(MODAL_KEY, MODAL_STATE.OPEN);
      prev.set(BOOKING_KEY, e.currentTarget.getAttribute('data-key') ?? '');
      return prev;
    });
  };

  return {
    onHandleClick,
    searchParams,
    modalInfo,
  };
}

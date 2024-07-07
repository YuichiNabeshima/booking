import { useEffect } from 'react';
import { useSearchParams } from '@remix-run/react';
import { BOOKING_TYPE } from '../../const';


export function useTypeOfSeat() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * If param has value, determine default value.
   */
  useEffect(() => {
    const defaultValue = searchParams.get(BOOKING_TYPE.KEY);
    const fields = document.querySelectorAll(`[name="${BOOKING_TYPE.KEY}"]`);

    [...fields].forEach(type => {
      if (type instanceof HTMLInputElement) {
        if (type.value === defaultValue) {
          type.checked = true;
        } else {
          type.checked = false;
        }
      }
    });
  }, []);

  const onHandleBookingType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set(BOOKING_TYPE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  return {
    onHandleBookingType,
  };
}

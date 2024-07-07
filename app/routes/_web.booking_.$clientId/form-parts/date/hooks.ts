import { useEffect } from 'react';
import { useSearchParams } from '@remix-run/react';
import { DATE } from '../../const';

export function useDate() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * If param has value, determine default value.
   */
  useEffect(() => {
    const defaultValue = searchParams.get(DATE.KEY);
    const field = document.querySelector(`[name="${DATE.KEY}"]`);
    console.log('default', defaultValue);

    if (field instanceof HTMLInputElement && defaultValue) {
      field.value = defaultValue;
    }
  }, []);

  const onHandleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setSearchParams(prev => {
        prev.delete(DATE.KEY);
        return prev;
      });
    }

    setSearchParams(prev => {
      prev.set(DATE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  return {
    onHandleDate,
  };
}

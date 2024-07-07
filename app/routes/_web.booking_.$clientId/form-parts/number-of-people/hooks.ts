import { useEffect } from 'react';
import { useSearchParams } from '@remix-run/react';
import { NUMBER_OF_PEOPLE } from '../../const';

export function useNumberOfPeople() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * If param has value, determine default value.
   */
  useEffect(() => {
    const defaultValue = searchParams.get(NUMBER_OF_PEOPLE.KEY);
    const field = document.querySelector(`[name=${NUMBER_OF_PEOPLE.KEY}]`);

    if (field instanceof HTMLSelectElement && defaultValue) {
      field.value = defaultValue;
    }
  }, []);

  const onHandleNumberOfPeople = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setSearchParams(prev => {
        prev.delete(NUMBER_OF_PEOPLE.KEY);
        return prev;
      })
    }

    setSearchParams(prev => {
      prev.set(NUMBER_OF_PEOPLE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  return {
    onHandleNumberOfPeople,
  };
}

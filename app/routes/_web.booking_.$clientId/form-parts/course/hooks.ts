import { useEffect } from 'react';
import { useSearchParams } from '@remix-run/react';
import { COURSE } from '../../const';

export function useCourse() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * If param has value, determine default value.
   */
  useEffect(() => {
    const defaultValue = searchParams.get(COURSE.KEY);
    const field = document.querySelector(`[name="${COURSE.KEY}"]`);

    if (field instanceof HTMLSelectElement && defaultValue) {
      field.value = defaultValue;
    }
  }, []);

  const onHandleCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setSearchParams(prev => {
      prev.set(COURSE.KEY, e.target.value);
      return prev;
    }, {
      preventScrollReset: true,
    });
  };

  return {
    onHandleCourse,
  };
}

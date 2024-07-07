import { getSelectProps } from '@conform-to/react';
import type { Course } from '~/models/course';
import type { FormProps } from '../type';
import { useCourse } from './hooks';

type Props = {
  courses: Course[];
};

export function Course({ field, courses }: Props & FormProps) {
  const { onHandleCourse } = useCourse();

  return (
    <fieldset className="pa-form-item">
      <div className="pa-form-item__inner">
        <label htmlFor="course" className="pa-form-item-heading">Select course</label>
        <select {...getSelectProps(field)} onChange={onHandleCourse} className="pa-form-item__select">
          <option value="" defaultChecked>Please select the course.</option>
          {courses.map(item => (
            <option
              key={item.id}
              value={item.id}
              data-time={item.time_range}
            >{`${item.name}（${item.time_range}）min`}</option>
          ))}
        </select>
        {field.errors && (
          <p className="pa-form-item-error">{field.errors}</p>
        )}
      </div>
    </fieldset>
  );
}

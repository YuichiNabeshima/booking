import { getSelectProps } from '@conform-to/react';
import type { FormProps } from '../type';
import { useNumberOfPeople } from './hooks';

export function NumberOfPeople({ field }: FormProps) {
  const { onHandleNumberOfPeople } = useNumberOfPeople()

  return (
    <fieldset className="pa-form-item pa-form-item--nop">
      <div className="pa-form-item__inner">
        <label htmlFor={field.id} className="pa-form-item-heading">Number of people booked</label>
        <select
          {...getSelectProps(field)}
          onChange={onHandleNumberOfPeople}
          className="pa-form-item__select"
        >
          <option value="" defaultChecked>Please select your number of people.</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      {field.errors && (
        <p className="pa-form-item-error">{field.errors}</p>
      )}
    </fieldset>
  );
}

import { BOOKING_TYPE } from '../../const';
import type { FormProps } from '../type';
import { useTypeOfSeat } from './hooks';

export function TypeOfSeat({ field }: FormProps) {
  const { onHandleBookingType } = useTypeOfSeat();

  return (
    <fieldset className="pa-form-item">
      <div className="pa-form-item__inner">
        <p className="pa-form-item-heading">Type Of Seat</p>
        <div className="pa-form-radio-items">
          {[
            { label: 'Seat at the bar', value: BOOKING_TYPE.SINGLE },
            { label: 'Table seat', value: BOOKING_TYPE.GROUP }
          ].map(type => (
            <div key={type.value} className="pa-form-radio-item">
              <input
                type="radio"
                name={field.name}
                id={type.value}
                value={type.value}
                onChange={onHandleBookingType}
                className="pa-form-radio-item__input"
              />
              <label htmlFor={type.value} className="pa-form-radio-item__label">{type.label}</label>
            </div>
          ))}
        </div>
      </div>
      {field.errors && (
        <p className="pa-form-item-error">{field.errors}</p>
      )}
    </fieldset>
  );
}

import { useDate } from './hooks';

export function Date() {
  const { onHandleDate } = useDate();

  return (
    <fieldset className="pa-form-item">
      <div className="pa-form-item__inner">
        <label htmlFor="date" className="pa-form-item-heading">Date</label>
        <input type="date" name="date" onChange={onHandleDate} className="pa-form-item__input pa-form-item__date"/>
      </div>
    </fieldset>
  );
}

import { useActionData } from '@remix-run/react';
import { getInputProps, FieldMetadata } from '@conform-to/react';
import { BaseModal } from '~/components/modal/base_modal/base_modal';
import { useModal } from './hooks';
import { ActionReturnValue } from '~/common/type';

type Props = {
  fullNameField: FieldMetadata;
  emailField: FieldMetadata;
};

export function Modal({ fullNameField, emailField }: Props) {
  const result = useActionData() as ActionReturnValue;
  const {
    emailContent,
    isConfirm,
    isFinish,
    convertToBr,
    convertToAnchor,
  } = useModal({ result });

  return (
    <BaseModal>
      {isConfirm && (
        <>
          <p className="pa-modal-intro">Please input your name and email.</p>
          <div className="pa-modal-items">
            <fieldset className={`pa-modal-item ${fullNameField.errors ? 'is-error' : ''}`}>
              <label htmlFor={fullNameField.id}>Name</label>
              <input {...getInputProps(fullNameField, { type: 'text' })} />
              {fullNameField.errors && (
                <div className="pa-modal-item__error">{fullNameField.errors}</div>
              )}
            </fieldset>

            <fieldset className={`pa-modal-item ${emailField.errors ? 'is-error' : ''}`}>
              <label htmlFor={emailField.id}>Email</label>
              <input {...getInputProps(emailField, { type: 'email' })} />
              {emailField.errors && (
                <div className="pa-modal-item__error">{emailField.errors}</div>
              )}
            </fieldset>

            <button
              type="submit"
              name="intent"
              value="finish"
              className="pa-modal-submit"
            >Submit</button>
          </div>
        </>
      )}
      {isFinish && (
        <>
          <p className="pa-modal-intro">We sent email to the email you inputed.</p>
          <div className="pa-modal-note">
            <p className="pa-modal-note__text">※Mail contents is below.<br />As this is prototype, we show the content of email.</p>
            <p className="pa-modal-note__email">
              <div dangerouslySetInnerHTML={convertToBr(convertToAnchor(emailContent.data ?? ''))}></div>
            </p>
          </div>
        </>
      )}
    </BaseModal>
  );
}

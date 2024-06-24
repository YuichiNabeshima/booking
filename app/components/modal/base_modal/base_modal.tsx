import { useBaseModal } from './hook';

const IS_SHOW_MODAL = 'is-show-modal';

type Props = {
  children: React.ReactNode;
  isDefaultShow?: boolean;
};

export function BaseModal({ children, isDefaultShow }: Props) {
  const { isShow, onHandleClose } = useBaseModal({ isDefaultShow });
  const modalStateClass = isShow ? IS_SHOW_MODAL : '';

  return (
    <>
      <div className={`c-overlay ${modalStateClass}`}></div>
      <div className={`c-modal ${modalStateClass}`}>
        <button
          className="c-modal-close icon-x"
          onClick={onHandleClose}
        ></button>
        <div className="c-modal-body">{children}</div>
      </div>
    </>
  );
}

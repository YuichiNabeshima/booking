import { useEffect } from 'react';
import { useFetcher, useSearchParams } from '@remix-run/react';
import { MAIL_ID, MODAL_KIND } from '../const';
import { MODAL_KEY, MODAL_STATE } from '~/components/modal/base_modal/const';
import { ActionReturnValue } from '~/common/type';

type Args = {
  result: ActionReturnValue;
};

export function useModal({ result }: Args) {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailContent = useFetcher<string>();
  const isConfirm = searchParams.get(MODAL_KIND.KEY) === MODAL_KIND.CONFIRM;
  const isFinish = searchParams.get(MODAL_KIND.KEY) === MODAL_KIND.EMAIL_SENT;

  useEffect(() => {
    emailContent.load(`/mailApi?mail-id=${searchParams.get(MAIL_ID.KEY)}`)
  }, [searchParams.get(MAIL_ID.KEY)]);

  useEffect(() => {
    if (!result?.success) {
      return;
    }

    if (result.modalKind === MODAL_KIND.CONFIRM) {
      setSearchParams(prev => {
        prev.set(MODAL_KEY, MODAL_STATE.OPEN);
        prev.set(MODAL_KIND.KEY, MODAL_KIND.CONFIRM);
        return prev;
      });
    }

    if (result.modalKind === MODAL_KIND.EMAIL_SENT) {
      setSearchParams(prev => {
        prev.set(MODAL_KEY, MODAL_STATE.OPEN);
        prev.set(MODAL_KIND.KEY, MODAL_KIND.EMAIL_SENT);
        prev.set(MAIL_ID.KEY, String(result?.mailResult ?? ''));
        return prev;
      });
    }

  }, [result]);

  function convertToBr(text: string) {
    return { __html: text.replace('\n', '<br>') ?? '' };
  }

  return {
    emailContent,
    isConfirm,
    isFinish,
    convertToBr,
  };
}
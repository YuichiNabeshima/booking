import { SubmissionResult } from '@conform-to/react';
import { MODAL_KIND } from '~/routes/_web.booking_.$clientId/const';

export type ActionReturnValue = {
  success: boolean;
  modalKind?: typeof MODAL_KIND[keyof typeof MODAL_KIND];
  message: string;
  submission: SubmissionResult;
  mailResult?: number;
};

import { SubmissionResult } from '@conform-to/react';

export type ActionReturn = {
  success: boolean;
  message: string;
  submission: SubmissionResult;
};

export type LoaderReturn = {
  result: {
    clientName: string;
    nop: string;
    type: string;
    course: string;
    date: string;
    start: string;
    name: string;
    email: string;
  },
  errorMsg: string,
};

export type ActionReturn = {
  actionErrorMsg: string;
};

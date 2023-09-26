export interface IError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

export const errorHandler = (err: IError) => {
  return err?.response?.data?.message || err.message;
};

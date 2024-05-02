interface IResponseError {
  message: string;
};

export class HttpError extends Error {
  statusCode: number;
  success: boolean;
  response: IResponseError;

  constructor(statusCode: number, success: boolean, response: IResponseError) {
    super();
    this.statusCode = statusCode;
    this.success = success;
    this.response = response;
  };
};
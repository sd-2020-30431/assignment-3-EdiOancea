import IHttpError from '../interfaces/IHttpError';

class HttpError extends Error implements IHttpError {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export default HttpError;

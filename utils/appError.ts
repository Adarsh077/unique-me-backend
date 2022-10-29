class AppError extends Error {
  statusCode: Number;
  status: String;
  isOperational: Boolean;

  constructor(message: string, statusCode: number) {
    message = typeof message === 'object' ? JSON.stringify(message) : message;

    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

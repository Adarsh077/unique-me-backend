import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils';

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendError = (err: any, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    let { message } = err;
    try {
      message = JSON.parse(message);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('String Error');
    }

    res.status(err.statusCode).json({
      status: err.status,
      message: message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    // eslint-disable-next-line no-console
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  // console.log(err.stack);
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.statusCode = err.statusCode;
  error.message = err.message;

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

  sendError(error, res);
};

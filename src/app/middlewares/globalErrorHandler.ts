/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/errors';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = 500;
  let message = err.message || 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: err.message || 'Something went wrong',
    },
  ];
  if (err instanceof ZodError) {
    const simlifiedError = handleZodError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simlifiedError = handleValidationError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simlifiedError = handleCastError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simlifiedError = handleDuplicateError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;

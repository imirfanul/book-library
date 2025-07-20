import { Response } from 'express';

export const handleError = (res: Response, error: any, defaultMessage: string): void => {
  console.error('Error:', error);
  
  const statusCode = error.statusCode || 500;
  const message = error.message || defaultMessage;
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: error.toString() })
  });
};
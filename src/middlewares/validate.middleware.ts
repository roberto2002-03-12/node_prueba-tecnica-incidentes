import { ObjectSchema } from 'joi'
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export const validateMiddleware = (schema: ObjectSchema<any>, property: 'body' | 'params' | 'query') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof Request];

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) next(createHttpError(400, error));
    
    next();
  }
}
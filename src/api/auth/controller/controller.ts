import { Request, Response, NextFunction } from 'express';
import { signToken } from '../services';
import createHttpError from 'http-errors';
import { IUser } from '../model';

export const signTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = req.user as IUser;
    const result = await signToken(user);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}


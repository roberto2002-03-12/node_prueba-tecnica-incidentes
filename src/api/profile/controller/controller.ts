import { Request, Response, NextFunction } from 'express';
import { updateProfileService } from '../services';
import { UpdateProfile } from '../model';
import createHttpError from 'http-errors';
import { IPayloadUser } from '../../../shared/models';

export const updateProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IPayloadUser
    const profile: UpdateProfile = req.body;
    const result = await updateProfileService(profile, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import {
  getAllUsersService, createUserAndProfileService,
  sendCodeRecoveryService, changePasswordService,
  changeForgotPasswordService, getUserByIdService,
  desactivateOrActivateUserService
} from '../services';
import { CreateUser } from '../model';
import { CreateProfile } from '../../profile/model';
import { IPayloadUser, OrderType } from '../../../shared/models';
import { IRole } from '../../privileges/model';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: CreateUser = req.body.user;
    const profile: CreateProfile = req.body.profile;
    const result = await createUserAndProfileService({ user: userData, profile });
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const createUserAndProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IPayloadUser;
    const userData: CreateUser = req.body.user;
    const profile: CreateProfile = req.body.profile;
    const role: IRole[] | undefined = req.body.role;
    const result = await createUserAndProfileService({ user: userData, profile }, user.sub, role);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order, fullName, email, roleName, active, createdAtStart, createdAtEnd, limit, page } = req.query;
    const result = await getAllUsersService({
      order: typeof order === 'undefined' ? 'DESC' : order?.toString() as OrderType,
      fullName: fullName?.toString() ?? '',
      email: email?.toString() ?? '',
      roleName: roleName?.toString() ?? '',
      active: active?.toString(),
      createdAtStart: createdAtStart?.toString(),
      createdAtEnd: createdAtEnd?.toString(),
      page: parseInt((page as string) ?? '1'),
      limit: typeof limit === 'undefined' ? undefined : parseInt(limit as string)
    });
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id)
    const result = await getUserByIdService(id);
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const sendCodeRecoveryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email: string = req.body.email;
    const result = await sendCodeRecoveryService(email);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const changeForgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await changeForgotPasswordService(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IPayloadUser;
    const result = await changePasswordService(req.body.newPassword, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const desactivateOrActivateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id)
    const user = req.user as IPayloadUser;
    const result = await desactivateOrActivateUserService(id, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}
// base
// export const changeForgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//   } catch (error: any) {
//     next(createHttpError(500, error));
//   }
// }
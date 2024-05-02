import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { 
  createRouteService, getAllRoutesService,
  assignRoleToUserService,
  // consultPrivilegeService,
} from '../services';
import { CreateRoute, CreateUserRole } from '../model';
import { IToken } from '../../../shared/models';

export const createRouteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken;
    const route: CreateRoute = req.body;
    const result = await createRouteService(route, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const assignRoleToUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken;
    const assignment: CreateUserRole = req.body;
    const result = await assignRoleToUserService(assignment, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllRoutesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { includeActions } = req.query;
    const result = await getAllRoutesService( 
      includeActions === 'true' ? true : 
      includeActions === 'false' ? false : false 
    );
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

// export const consultPrivilegeController = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const roles: string[] = ['admin', 'super-admin'];
//     const result = await consultPrivilegeService(roles, '/privileges/', 'create-role');
//     return res.status(200).json(result);
//   } catch (error: any) {
//     next(createHttpError(500, error));
//   }
// }
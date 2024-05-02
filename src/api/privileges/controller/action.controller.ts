import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { 
  createActionService, assignActionsToRoleService, 
  assignMassiveActionsToRoleService 
} from '../services';
import { CreateAction, IRoleAction, IRoleJson } from '../model';
import { IToken } from '../../../shared/models';

export const createActionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken;
    const action: CreateAction = req.body;
    const result = await createActionService(action, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const assignActionsToRoleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken;
    const assignment: IRoleAction = req.body;
    const result = await assignActionsToRoleService(assignment, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const assignMassiveActionsToRoleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken;
    const assignment: IRoleJson = req.body;
    const result = await assignMassiveActionsToRoleService(assignment, user.sub);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}
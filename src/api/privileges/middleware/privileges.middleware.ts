import { Request, Response, NextFunction } from 'express';
import { IRouteCount } from '../model';
import { IPayloadUser } from '../../../shared/models';
import { consultPrivilegeService } from '../services';

export function checkCredentials(action: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IPayloadUser;
    
    if (user.roles.length === 0) return res.status(403).json({ message: `You don't have the privileges to do this action` });

    const result: IRouteCount = await consultPrivilegeService(user.roles, action);

    if (result.count == 0) return res.status(403).json({ message: `You don't have the privileges to do this action` });

    next();
  };
};
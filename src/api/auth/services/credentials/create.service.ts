import jwt from 'jsonwebtoken';
import { IUser} from '../../model/user/user.model';
import { IPayloadUser } from '../../../../shared/models/payloads.model';
import config from '../../../../config';
import { DataBase } from '../../../../database';

export const signToken = async (user: IUser) => {
  try {
    const roles: string[] = [];
    if (user.role.length > 0) {
      for (let i: number = 0; i < user?.role.length; i += 1) {
        roles.push(user.role[i].roleName);
      };
    }

    const payload: IPayloadUser = {
      sub: user.id,
      roles: roles,
      routes: user.routes ?? [],
    };

    const token: string = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '4h' });
    
    await DataBase.instance.user.update(
      {
        loggedToken: token
      },
      {
        where: {
          id: user.id
        }
      }
    );

    return {
      user,
      token
    };
  } catch (error) {
    throw error;
  }
}
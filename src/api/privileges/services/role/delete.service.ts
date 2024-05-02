import { DataBase } from "../../../../database";
import createHttpError from "http-errors";
import config from '../../../../config';
import moment from "moment-timezone";

export const desactivateOrActivateRoleService = async (roleId: number, userId: number) => {
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const role = await DataBase.instance.role.findByPk(roleId);
    
    if (!role) throw createHttpError(404, 'Role not found');

    return await DataBase.instance.role.update({ 
      active: role.dataValues.active == false ? true : false,
      updated_by: userId, 
      updated_at: new Date(dateNowFormat)
    }, {
      where: {
        id: roleId
      }
    });
  } catch (error: any) {
    throw error;
  }
};
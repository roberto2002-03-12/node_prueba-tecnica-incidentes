import { DataBase } from "../../../../database";
import createHttpError from "http-errors";
import config from '../../../../config';
import moment from "moment-timezone";

export const desactivateOrActivateUserService = async (userId: number, updatedBy: number) => {
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const user = await DataBase.instance.user.findByPk(userId);
    
    if (!user) throw createHttpError(404, 'User not found');

    return await DataBase.instance.user.update({ 
      active: user.dataValues.active == false ? true : false,
      updated_by: updatedBy, 
      updated_at: new Date(dateNowFormat)
    }, {
      where: {
        id: userId
      }
    });
  } catch (error: any) {
    throw error;
  }
}
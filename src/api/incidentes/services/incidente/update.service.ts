import createHttpError from "http-errors";
import { DataBase } from "../../../../database";
import { UpdateIncidente } from '../../model'
import moment from "moment";
import config from "../../../../config";

export const updateIncidenteService = async (id: number, data: UpdateIncidente, updatedBy: number) => {
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const result = await DataBase.instance.incidente.findByPk(id);
    if (!result) throw createHttpError(404, `El incidente no existe`);
    await result.update({
      ...data,
      updatedAt: new Date(dateNowFormat),
      updatedBy
    });
    return { message: 'Incidente actualizado correctamente' }
  } catch (error) {
    throw error;
  }
}
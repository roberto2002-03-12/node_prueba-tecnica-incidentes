import { DataBase } from "../../../../database";
import { CreateIncidente } from "../../model";
import moment from "moment";
import config from "../../../../config";
import createHttpError from "http-errors";

export const createIncidenteService = async (data: CreateIncidente, createdBy: number) => {
  try {
    if (data.bloqueId === undefined && data.departamentoId === undefined) 
      throw createHttpError(400, 'Debes por lo menos indicar el departamento o bloque del incidente')

    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const incidente = await DataBase.instance.incidente.create({
      ...data,
      createdBy,
      userId: createdBy,
      createdAt: new Date(dateNowFormat),
      updatedAt: new Date(dateNowFormat),
      updatedBy: createdBy
    });

    return incidente;
  } catch (error) {
    throw error;
  }
}
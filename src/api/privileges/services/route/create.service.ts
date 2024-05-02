import { DataBase } from "../../../../database";
import { CreateRoute } from '../../model';
import config from '../../../../config';
import moment from 'moment-timezone';

// en sí el desarrollador debería registrar las rutas mediante código sql, no mediante
// la api, pero dejo la opción por si alguien quiere, pero por defecto estará establecido
// con rol requisito de super admin

// the developer should register all the routes allowed by sql code, not by using this service
// but i leave if you want it, I'll set it that only super admin can create.
export const createRouteService = async (data: CreateRoute, userId: number) => {
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    return await DataBase.instance.route.create(
      {
        ...data,
        created_by: userId,
        created_at: new Date(dateNowFormat),
        updated_by: userId,
        updated_at: new Date(dateNowFormat)
      }
    )
  } catch (error) {
    throw error;
  }
}
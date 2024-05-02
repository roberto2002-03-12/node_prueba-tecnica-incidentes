import { DataBase } from "../../../../database";
import { Transaction } from "sequelize";
import { CreateAction, IRoleAction, IRoleJson } from '../../model';
import config from '../../../../config';
import moment from 'moment-timezone';

// en sí el desarrollador debería registrar las acciones mediante código sql, no mediante
// la api, pero dejo la opción por si alguien quiere, pero por defecto estará establecido
// con rol requisito de super admin

// the developer should register all the actions allowed by sql code, not by using this service
// but i leave if you want it, I'll set it that only super admin can create.
export const createActionService = async (data: CreateAction, userId: number) => {
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    return await DataBase.instance.action.create({
      ...data,
      created_by: userId,
      created_at: new Date(dateNowFormat),
      updated_by: userId,
      updated_at: new Date(dateNowFormat)
    });
  } catch (error) {
    throw error;
  }
};

export const assignActionsToRoleService = async (data: IRoleAction, userId: number) => {
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    return await DataBase.instance.roleAction.create({
      ...data,
      created_by: userId,
      created_at: new Date(dateNowFormat),
      updated_by: userId,
      updated_at: new Date(dateNowFormat)
    });
  } catch (error: any) {
    throw error;
  }
}

export const assignMassiveActionsToRoleService = async (data: IRoleJson, userId: number) => {
  let transaction: Transaction = await DataBase.instance.sequelize.transaction();
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const finalData: IRoleAction[] = [];

    for (let i: number = 0; i < data.action.length; i++) {
      finalData.push({
        roleId: data.id,
        actionId: data.action[i].id,
        created_by: userId,
        created_at: new Date(dateNowFormat),
        updated_by: userId,
        updated_at: new Date(dateNowFormat)
      } as IRoleAction);
    }

    await DataBase.instance.roleAction.bulkCreate(finalData, { transaction });

    await transaction.commit();

    return { message: `Actions assigned to Role successfully` };
  } catch (error: any) {
    if (transaction) await transaction.rollback();
    throw error;
  }
}
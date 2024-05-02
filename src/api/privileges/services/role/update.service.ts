import { DataBase } from "../../../../database";
import { Transaction } from "sequelize";
import { IRoleAction, UpdateRole, CreateRoleAction } from '../../model';
import config from '../../../../config';
import moment from 'moment-timezone';
import createHttpError from "http-errors";

export const updateAssignMassiveActionToRoleService = async (role: UpdateRole, roleId: number, userId: number) => {
  let transaction: Transaction = await DataBase.instance.sequelize.transaction();
  try {

    const oldRole = await DataBase.instance.role.findByPk(roleId, { include: ['action'] });

    if (!oldRole) throw createHttpError(404, 'Role not found');
    if (oldRole.active == false) throw createHttpError(400, `Can't update a role which isn't active.`);

    const oldRoleToJson = oldRole.toJSON();

    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');


    await oldRole.update({
      ...role
    }, { transaction });

    if (typeof role.action !== 'undefined' && role.action.length !== 0) {

      // puede que el rol no se le haya seleccionado los action aún

      if (typeof oldRoleToJson.action === 'undefined') {
        const finalData: IRoleAction[] = [];

        for (let i: number = 0; i < role.action.length; i++) {
          finalData.push({
            roleId,
            actionId: role.action[i].id,
            created_by: userId,
            created_at: new Date(dateNowFormat),
            updated_by: userId,
            updated_at: new Date(dateNowFormat)
          } as IRoleAction);
        }

        await DataBase.instance.roleAction.bulkCreate(finalData, { transaction });

        await transaction.commit();

        return { message: 'Privileges for role have been successfully updated' };
      }

      // en caso de que tenga

      let newPrivileges: CreateRoleAction[] = [];
      const privilegesToDelete: number[] = [];
      const privilegesToKeep: number[] = [];

      for (let i: number = 0; i < oldRoleToJson.action.length; i++) {
        if (!role.action.some(act => act.id === oldRoleToJson.action![i].id)) {
          privilegesToDelete.push(oldRoleToJson.action![i].id);
        } else {
          privilegesToKeep.push(oldRoleToJson.action![i].id);
        }
      }

      for (let i: number = 0; i < role.action.length; i++) {
        if (!privilegesToKeep.includes(role.action[i].id)) {
          newPrivileges.push({
            roleId,
            actionId: role.action[i].id,
            created_by: userId,
            created_at: new Date(dateNowFormat),
            updated_by: userId,
            updated_at: new Date(dateNowFormat)
          });
        }
      }

      await DataBase.instance.roleAction.bulkCreate(newPrivileges, { transaction });

      if (privilegesToDelete.length > 0) {
        await DataBase.instance.roleAction.destroy({
          where: {
            roleId,
            actionId: privilegesToDelete
          },
          transaction
        });
      };
    } else {
      await DataBase.instance.roleAction.destroy({
        where: {
          roleId
        },
        transaction
      })
    };

    await transaction.commit();

    return { message: 'Role updated' };
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
}
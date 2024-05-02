import { DataBase } from "../../../../database";
import { Transaction } from 'sequelize'
import { CreateRole, CreateRoleAction, CreateUserRole, IAction, IRole, IRoleAction } from '../../model';
import config from '../../../../config';
import moment from 'moment-timezone';
import createHttpError from "http-errors";

export const createRoleService = async (data: CreateRole, userId: number) => {
  let transaction: Transaction = await DataBase.instance.sequelize.transaction(); 
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const actions: IAction[] | undefined = data.action;
    delete data.action;

    const result = await DataBase.instance.role.create({
      ...data,
      created_by: userId,
      created_at: new Date(dateNowFormat),
      updated_by: userId,
      updated_at: new Date(dateNowFormat)
    }, { transaction });

    if (actions && actions.length > 0) {
      const roleActions: CreateRoleAction[] = [];

      for (let i: number = 0; i < actions.length; i++) {
        roleActions.push({
          roleId: result.dataValues.id,
          actionId: actions[i].id,
          created_by: userId,
          created_at: new Date(dateNowFormat),
          updated_by: userId,
          updated_at: new Date(dateNowFormat)
        });
      };

      await DataBase.instance.roleAction.bulkCreate(roleActions, { transaction });
    }

    await transaction.commit();

    return result;
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

export const assignRoleToUserService = async (data: CreateUserRole, userId: number) => {
  try {
    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    return await DataBase.instance.userRole.create({
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

export const assignRoleToUserMassiveService = async (data: { userId: number, roles: IRole[] }, userId: number) => {
  const transaction: Transaction = await DataBase.instance.sequelize.transaction();
  try {
    const user = await DataBase.instance.user.findByPk(data.userId, {
      include: [{
        model: DataBase.instance.role,
        as: 'role',
        required: false,
        attributes: ['id']
      }]
    });

    if (!user) throw createHttpError(404, `You can't assign roles to an user that doesn't exist`);
    if (user.active == false) throw createHttpError(400, `Can't assign roles to user desactivated`);

    const oldUserToJson = user.toJSON();
    const oldRoles = oldUserToJson.role ?? [];
    const rolesToDelete: number[] = [];

    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const rolesAssign: CreateUserRole[] = [];

    if (user.role.length === 0) {
      for (let i = 0; i < data.roles.length; i++) {
        rolesAssign.push({
          user_id: data.userId,
          role_id: data.roles[i].id,
          created_by: userId,
          created_at: new Date(dateNowFormat),
          updated_by: userId,
          updated_at: new Date(dateNowFormat)
        });
      }
    } else {
      for (let i = 0; i < data.roles.length; i++) {
        const isItANewRole = oldRoles.some(old => old.id !== data.roles[i].id)
        if (isItANewRole === true) {
          rolesAssign.push({
            user_id: data.userId,
            role_id: data.roles[i].id,
            created_by: userId,
            created_at: new Date(dateNowFormat),
            updated_by: userId,
            updated_at: new Date(dateNowFormat)
          })
        }
      };
  
      for (let i = 0; i < oldRoles.length; i++) {
        if (!data.roles.some(rol => rol.id === oldRoles[i].id)) {
          rolesToDelete.push(oldRoles[i].id);
        }
      };
    }

    const result = await DataBase.instance.userRole.bulkCreate(rolesAssign, { transaction });

    if (rolesToDelete.length > 0) {
      await DataBase.instance.userRole.destroy({
        where: {
          role_id: rolesToDelete,
          user_id: data.userId
        },
        transaction
      });
    };

    await transaction.commit();

    return result;
  } catch (error: any) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};
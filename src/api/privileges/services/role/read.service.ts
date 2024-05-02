import { DataBase } from '../../../../database';
import { Op } from 'sequelize';
import { Includeable, WhereOptions } from 'sequelize/types';
import createHttpError from 'http-errors';
import { IRoleQuery, IRole, IRoute } from '../../model';

export const getAllRolesService = async (queries: IRoleQuery) => {
  try {
    const offset = (queries.page - 1) * (queries.limit ?? 20);

    const includeOptions: Includeable[] = [];
    const whereOptions: WhereOptions<IRole> = {
      active: queries.active ?? true,
      roleName: {
        [Op.like]: `%${queries.roleName}%`
      }
    };

    if (queries.createdAtStart && !queries.createdAtEnd || !queries.createdAtStart && queries.createdAtEnd) throw createHttpError(400, `You have to select a start date and end date, not only one`)

    if (queries.createdAtStart && queries.createdAtEnd) {
      const startDate = new Date(queries.createdAtStart);
      const endDate = new Date(queries.createdAtEnd);
      whereOptions.created_at = {
        [Op.between]: [startDate, endDate]
      }
    };

    if (queries.routeId) {
      const includeRouteOption: Includeable = {
        model: DataBase.instance.action,
        as: 'action',
        where: {
          routeId: queries.routeId
        },
        required: true,
      };

      includeOptions.push(includeRouteOption);
    }

    const { rows, count } = await DataBase.instance.role.findAndCountAll({
      where: whereOptions,
      include: includeOptions,
      order: [
        ['created_at', typeof queries.order === 'undefined' ? 'DESC' : queries.order ]
      ],
      offset,
      limit: (queries.limit ?? 20),
      distinct: true
    });

    if (queries.routeId) {
      const newData = rows.map(obj => {
        delete obj.dataValues.action;
        return obj
      });

      return {
        count: count,
        page: queries.page,
        data: newData
      }
    }

    return {
      count,
      page: queries.page,
      data: rows
    };
  } catch (error) {
    throw error;
  }
}


export const getOneRoleService = async (roleId: number, includeActions?: boolean) => {
  try {
    const includeOptions: Includeable[] = [];

    if (includeActions) {
      includeOptions.push({
        model: DataBase.instance.action,
        as: 'action',
        required: false,
        attributes: ['id', 'actionName']
      })
    } else {
      includeOptions.push({
        model: DataBase.instance.action,
        as: 'action',
        required: false,
      });
    }

    const role = await DataBase.instance.role.findByPk(roleId, {
      include: includeOptions
    });

    if (!role) throw createHttpError(404, 'Role not found');

    // role!.dataValues.route = [];

    const routesId: number[] = [];
    let routes: IRoute[] = [];

    if (typeof role.action !== 'undefined' && role.action.length > 0 && typeof includeActions === 'undefined') {
      for (let i: number = 0; i < role.action.length; i++) {
        const filterId = routesId.includes(role.action[i].routeId);
        if (!filterId) routesId.push(role.action[i].routeId);
      };

      const routesFound = await DataBase.instance.route.findAll({
        where: {
          id: routesId
        }
      });

      routes = routesFound.map((rt) => {
        rt.dataValues.action = [];
        return rt.toJSON()
      });
  
      for (let i: number = 0; i < routes.length; i++) {
        for (let j: number = 0; j < role.action.length; j++) {
          if (role.action[j].routeId === routes[i].id) {
            routes[i].action.push(role.action[j]);
          }
        }
      }
    }

    role.dataValues.route = routes;
    if (typeof includeActions === 'undefined') {
      delete role.dataValues.action;
    };

    return role;
  } catch (error) {
    throw error;
  }
}

export const getRolesForSelectService = async () => {
  try {
    return await DataBase.instance.role.findAll({
      attributes: ['roleName', 'id'],
      where: { active: true }
    });
  } catch (error) {
    throw error;
  }
}
import { DataBase } from "../../../../database";
import Sequelize, { Op, QueryTypes } from 'sequelize';
import { WhereOptions } from 'sequelize/types';
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import { ISecureUser, IUserQuery, IUser } from '../../model';
import { IProfile } from "../../../profile/model";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await DataBase.instance.user.findOne({
      where: {
        email
      },
      attributes: {
        exclude: ['loggedToken', 'recoveryToken']
      },
      include: [{
        model: DataBase.instance.role,
        as: 'role',
        required: false
      }, {
        model: DataBase.instance.profile,
        as: 'profile',
        required: false
      }]
    });

    if (!user) throw createHttpError(404, `There is no user registered with email: ${email}`);

    const userJson = user.toJSON();

    let roleIds: number[] = [];

    if (typeof userJson.role !== 'undefined' && userJson.role.length > 0) {
      for (let i: number = 0; i < userJson.role.length; i++) {
        roleIds.push(userJson.role[i].id);
      }

      const sqlQuery = 
      `
      SELECT DISTINCT r.url
      FROM role AS rl
      JOIN role_action AS ra ON rl.id = ra.role_id
      JOIN action AS ac ON ra.action_id = ac.id
      JOIN route AS r ON ac.route_id = r.id
      WHERE rl.id IN (:roleIds);
      `;

      const resultOfQuery = await DataBase.instance.sequelize.query(sqlQuery, {
        replacements: { roleIds },
        type: QueryTypes.SELECT
      });

      userJson.routes = resultOfQuery.map((obj: any) => obj.url);
    }

    return userJson;
  } catch (error: any) {
    throw error;
  }
};

export const getUser = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);

    if (user.active == false) throw createHttpError(401, 'The user is desactivated, contact with support for help.');

    const comparePasswords = await bcrypt.compare(password, user.password!);

    if (!comparePasswords) throw createHttpError(401, 'Bad password, try again.');

    const userSecure = { ...user, password: undefined } as ISecureUser;

    return userSecure;
  } catch (error) {
    throw error;
  }
}

export const getAllUsersService = async (queries: IUserQuery) => {
  try {
    const offset = (queries.page - 1) * (queries.limit ?? 20);

    const whereOptions: WhereOptions<IUser> = {
      active: typeof queries.active === 'undefined' ? true : queries.active === 'true' ? true : false,
      email: {
        [Op.like]: `%${queries.email}%`
      },
    }

    if (queries.createdAtStart && !queries.createdAtEnd || !queries.createdAtStart && queries.createdAtEnd) throw createHttpError(400, `You have to select a start date and end date, not only one`)

    if (queries.createdAtStart && queries.createdAtEnd) {
      const startDate = new Date(queries.createdAtStart);
      const endDate = new Date(queries.createdAtEnd);
      whereOptions.created_at = {
        [Op.between]: [startDate, endDate]
      }
    };

    let whereOptionsProfile: WhereOptions<IProfile> = {};

    if (queries.fullName) {
      whereOptionsProfile = Sequelize.where(
        Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
        {
          [Op.like]: `%${queries.fullName}%`
        }
      )
    }

    const { rows, count } = await DataBase.instance.user.findAndCountAll({
      where: whereOptions,
      attributes: {
        exclude: ['password', 'loggedToken', 'recoveryToken']
      },
      include: [{
        model: DataBase.instance.profile,
        as: 'profile',
        where: whereOptionsProfile,
        required: typeof queries.fullName !== 'undefined' && queries.fullName !== '' ? true : false
      }, {
        model: DataBase.instance.role,
        as: 'role',
        required: queries.roleName !== '' ? true : false,
        where: {
          roleName: {
            [Op.like]: `%${queries.roleName}%`
          }
        },
        attributes: ['id', 'roleName']
      }],
      order: [
        [
          'created_at', 
          typeof queries.order === 'undefined' ? 'DESC' : queries.order === 'ASC' ? 'ASC' : 'DESC'
        ]
      ],
      offset,
      limit: (queries.limit ?? 20),
      distinct: true
    });

    return {
      count: count,
      page: queries.page,
      data: rows
    }
  } catch (error) {
    throw error;
  }
}

export const getUserByIdService = async (id: number) => {
  try {
    const user = await DataBase.instance.user.findByPk(id, { 
      include: [{
        model: DataBase.instance.profile,
        as: 'profile',
        required: false,
      }, {
        model: DataBase.instance.role,
        as: 'role',
        required: false
      }],
      attributes: {
        exclude: ['password', 'loggedToken', 'recoveryToken']
      }
    });

    if (!user) throw createHttpError(404, `User with id: ${id}, not found`);

    return user;
  } catch (error) {
    throw error;
  }
}
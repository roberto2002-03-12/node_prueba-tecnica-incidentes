import { DataBase } from '../../../../database';
import { QueryTypes } from 'sequelize';
import { IRouteCount } from '../../model';

export const consultPrivilegeService = async (roles: string[], action: string[]) => {
  try {
    // const sqlQuery = 
    // `
    // SELECT COUNT(*) AS count
    // FROM role AS r
    // INNER JOIN role_route AS rr ON r.id = rr.role_id
    // INNER JOIN route AS rt ON rr.route_id = rt.id
    // INNER JOIN route_action AS ra ON rt.id = ra.route_id
    // INNER JOIN action AS a ON ra.action_id = a.id
    // WHERE r.role_name IN (:roles)
    // AND rt.url = :route
    // AND a.action_name = :action
    // `;

    const sqlQuery2 = 
    `
    SELECT COUNT(*) as count
    FROM role as r
    INNER JOIN role_action AS ra ON r.id = ra.role_id
    INNER JOIN action AS a ON a.id = ra.action_id
    WHERE r.role_name IN (:roles)
    AND a.action_name IN (:action)
    AND r.active = 1
    `

    const result = await DataBase.instance.sequelize.query(sqlQuery2, {
      replacements: { roles, action },
      type: QueryTypes.SELECT
    });

    return result[0] as IRouteCount;
  } catch (error) {
    throw error;
  }
};
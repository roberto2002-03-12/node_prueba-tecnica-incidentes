import { ActionStatic, RouteStatic } from '../../api/privileges/model';

export const routeOneToManyAction = (
  {
    route,
    action
  } : {
    route: RouteStatic
    action: ActionStatic
  }
): void => {
  route.hasMany(action, {
    foreignKey: 'route_id',
    as: 'action'
  });
}
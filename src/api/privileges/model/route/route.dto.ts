import { IRoute } from './route.model';

export interface CreateRoute extends Omit<IRoute, 'id' | 'action'> {};

export interface UpdateRouteOmits extends Omit<IRoute, 'id' | 'created_at' | 'created_by'> {};

export interface UpdateRoute extends Partial<UpdateRouteOmits> {};
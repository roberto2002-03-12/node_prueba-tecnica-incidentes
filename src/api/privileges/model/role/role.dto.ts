import { IRole } from './role.model';

export interface CreateRole extends Omit<IRole, 'id' | 'active'> {};

export interface UpdateRoleOmits extends Omit<IRole, 'id' | 'created_at' | 'created_by'> {};

export interface UpdateRole extends Partial<UpdateRoleOmits> {};
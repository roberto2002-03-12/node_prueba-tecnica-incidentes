import { IRoleAction } from './relation.model';

export interface CreateRoleAction extends Omit<IRoleAction, 'id'> {};
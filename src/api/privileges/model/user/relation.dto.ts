import { IUserRole } from './relation.model';

export interface CreateUserRole extends Omit<IUserRole, 'id'> {};
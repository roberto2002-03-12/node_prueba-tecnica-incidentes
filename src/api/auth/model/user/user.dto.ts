import { IUser } from './user.model';

export interface CreateUser extends Omit<IUser, 'id' | 'loggedToken' | 'recoveryToken' | 'profile' | 'role'> {};

interface UpdatedUserOmits extends Omit<IUser, 'id' | 'created_by' | 'created_at'> {};

export interface UpdateUser extends Partial<UpdatedUserOmits> {};

export interface ISecureUser extends Omit<IUser, 'password' | 'logged_token' | 'recovery_token'> {};
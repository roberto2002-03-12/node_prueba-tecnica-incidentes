import { IAction } from './action.model';

export interface CreateAction extends Omit<IAction, 'id'> {};

export interface UpdateActionOmits extends Omit<IAction, 'id' | 'created_at' | 'created_by'> {};

export interface UpdateAction extends Partial<UpdateActionOmits> {};
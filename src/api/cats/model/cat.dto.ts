import { ICat } from './cat.model';

export interface CreateCat extends Omit<ICat, 'id'> {};

export interface UpdateCatOmits extends Omit<ICat, 'id' | 'created_at' | 'created_by'> {};

export interface UpdateCat extends Partial<UpdateCatOmits> {};
import { IBloque } from './bloque.model'

export interface CreateBloque extends Omit<IBloque, 'id'> {};

interface UpdateBloqueOmits extends Omit<IBloque, 'id'> {};

export interface UpdateBloque extends Partial<UpdateBloqueOmits> {};
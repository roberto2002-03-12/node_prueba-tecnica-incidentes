import { IDepartamento } from './departamento.model'

export interface CreateDepartamento extends Omit<IDepartamento, 'id'> {};

interface UpdateDepartamentoOmits extends Omit<IDepartamento, 'id'> {};

export interface UpdateDepartamento extends Partial<UpdateDepartamentoOmits> {};
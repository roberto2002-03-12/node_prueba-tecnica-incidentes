import { IIncidente } from './incidente.model'

export interface CreateIncidente extends Omit<IIncidente, 'id'> {};

interface UpdateIncidenteOmits extends Omit<IIncidente, 'id' | 'createdAt' | 'createdBy'> {};

export interface UpdateIncidente extends Partial<UpdateIncidenteOmits> {};
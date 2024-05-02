import { DataBase } from '../../../../database'
import { CreateDepartamento } from '../../models'

export const createDepartamentoService = async (data: CreateDepartamento) => {
  try {
    return await DataBase.instance.departamento.create(data);
  } catch (error) {
    throw error;
  }
}
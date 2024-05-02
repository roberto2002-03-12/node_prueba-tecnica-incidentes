import { DataBase } from '../../../../database';
import { CreateBloque } from '../../models';

export const createBloqueService = async (data: CreateBloque) => {
  try {
    return await DataBase.instance.bloque.create(data);
  } catch (error) {
    throw error;
  }
}
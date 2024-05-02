import { DataBase } from '../../../database';
import { getOneCatService } from './read.service';
import { UpdateCat } from '../model';

export const deleteCatService = async (id: number) => {
  try {
    return await DataBase.instance.cat.destroy({ where: { id } })
  } catch (error) {
    throw error;
  }
}
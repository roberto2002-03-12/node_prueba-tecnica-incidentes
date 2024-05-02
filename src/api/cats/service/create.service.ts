import { DataBase } from '../../../database';
import { CreateCat } from '../model';

export const createCatService = async (cat: CreateCat) => {
  try {
    const result = await DataBase.instance.cat.create(cat);
    return result;
  } catch (error) {
    throw error;
  }
}
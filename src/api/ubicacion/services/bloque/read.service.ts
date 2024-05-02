import createHttpError from 'http-errors';
import { DataBase } from '../../../../database';
import { IBloqueQueries } from '../../models';

// solo va ser usado de manera interna para delete
export const getOneBloqueByIdService = async (id: number) => {
  try {
    const bloque = await DataBase.instance.bloque.findByPk(id);

    if (!bloque) throw createHttpError(404, 'No se encontro el bloque');

    return bloque;
  } catch (error) {
    throw error;
  }
}

export const getAllBloquesService = async (queries: IBloqueQueries) => {
  try {
    const offset = (queries.page - 1) * (queries.limit ?? 20);

    const { rows, count } = await DataBase.instance.bloque.findAndCountAll({
      order: [
        ['id', 'DESC']
      ],
      offset,
      limit: (queries.limit ?? 20)
    });

    return {
      count,
      page: queries.page,
      data: rows
    }
  } catch (error) {
    throw error;
  }
}

export const getAllBloquesForSelectService = async () => {
  try {
    return await DataBase.instance.bloque.findAll({ order: [['id', 'DESC']] });
  } catch (error) {
    throw error;
  }
}
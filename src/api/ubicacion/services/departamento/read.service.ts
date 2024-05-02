import createHttpError from 'http-errors';
import { DataBase } from '../../../../database';
import { IDepartamentoQueries } from '../../models';

// solo va ser usado de manera interna para delete
export const getOneDepartamentoByIdService = async (id: number) => {
  try {
    const departamento = await DataBase.instance.departamento.findByPk(id);

    if (!departamento) throw createHttpError(404, 'No se encontro el departamento');

    return departamento;
  } catch (error) {
    throw error;
  }
}

export const getAllDepartamentoService = async (queries: IDepartamentoQueries) => {
  try {
    const offset = (queries.page - 1) * (queries.limit ?? 20);

    const { rows, count } = await DataBase.instance.departamento.findAndCountAll({
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

export const getAllDepartamentoForSelectService = async () => {
  try {
    return await DataBase.instance.departamento.findAll({ order: [['id', 'DESC']] });
  } catch (error) {
    throw error;
  }
}
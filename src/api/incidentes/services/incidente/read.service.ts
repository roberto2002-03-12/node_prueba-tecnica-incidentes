import { DataBase } from "../../../../database";
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize/types';
import createHttpError from "http-errors";
import { IIncidente, IIncidenteQuery } from '../../model'

export const getAllIncidenteByQueriesService = async (queries: IIncidenteQuery, userId?: number) => {
  try {
    const offset = (queries.page - 1) * (queries.limit ?? 20);

    const whereOptions: WhereOptions<IIncidente> = {};

    if (queries.createdAtStart && !queries.createdAtEnd || !queries.createdAtStart && queries.createdAtEnd)
      throw createHttpError(400, `Tienes que establecer una fecha fin e inicio, para poder buscar por fecha`);

    if (queries.createdAtStart && queries.createdAtEnd) {
      const startDate = new Date(queries.createdAtStart);
      const endDate = new Date(queries.createdAtEnd);
      whereOptions.createdAt = {
        [Op.between]: [startDate, endDate]
      }
    };

    if (queries.bloqueId) whereOptions.bloqueId = queries.bloqueId
    if (queries.estado) whereOptions.estado = queries.estado

    // los residentes solo deben ver sus incidencias, no de los demás.
    if (userId) whereOptions.createdBy = userId;

    const { count, rows } = await DataBase.instance.incidente.findAndCountAll({
      where: whereOptions,
      order: [
        ['created_at', 'DESC']
      ],
      offset,
      limit: (queries.limit ?? 20),
      distinct: true
    });

    return { count, rows }
  } catch (error) {
    throw error;
  }
}

export const getOneIncidenteByIdService = async (id: number, userId?: number) => {
  try {
    const whereOptions: WhereOptions<IIncidente> = {
      id
    };

    if (userId) whereOptions.createdBy = userId;

    const incidente = await DataBase.instance.incidente.findOne({
      where: whereOptions,
      include: [{
        model: DataBase.instance.departamento,
        as: 'departamento',
        required: false
      }, {
        model: DataBase.instance.bloque,
        as: 'bloque',
        required: false
      }, {
        model: DataBase.instance.foto,
        as: 'fotos',
        required: false
      }]// agregar user y su profile
    });

    if (!incidente) throw createHttpError(404, 'El incidente indicado no existe');

    return incidente;
  } catch (error) {
    throw error;
  }
}
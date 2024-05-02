import { DataBase } from '../../../database';
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize/types';
import { ICatQuery, ICat } from '../model';
import createHttpError from 'http-errors';

export const getAllCatsService = async (queries: ICatQuery) => {
  try {
    const offset = (queries.page - 1) * (queries.limit ?? 20);
    const whereOptions: WhereOptions<ICat> = {
      name: {
        [Op.like]: `%${queries.name ?? ''}%`,
      },
      race: {
        [Op.like]: `%${queries.race ?? ''}%`,
      }
    };

    if (queries.highestPrice && queries.minimumPrice && queries.highestPrice < queries.minimumPrice) throw createHttpError(400, `Minimum price can't be higher than Highest price`);

    if (queries.minimumPrice && !queries.highestPrice) {
      whereOptions.price = {
        [Op.gte]: queries.minimumPrice
      };
    } else if (queries.highestPrice && !queries.minimumPrice) {
      whereOptions.price = {
        [Op.lte]: queries.highestPrice
      };
    } else if (queries.highestPrice && queries.minimumPrice) {
      whereOptions.price = {
        [Op.gte]: queries.minimumPrice,
        [Op.lte]: queries.highestPrice
      }
    }

    if (queries.birthStart && !queries.birthEnd || !queries.birthStart && queries.birthEnd) throw createHttpError(400, `You have to select a start date and end date, not only one`)

    if (queries.birthStart && queries.birthEnd) {
      const startDate = new Date(queries.birthStart);
      const endDate = new Date(queries.birthEnd);
      whereOptions.birth = {
        [Op.between]: [startDate, endDate]
      }
    };

    const { rows, count } = await DataBase.instance.cat.findAndCountAll({
      where: whereOptions,
      order: [
        ['price', typeof queries.order === 'undefined' ? 'DESC' : queries.order ]
      ],
      offset,
      limit: (queries.limit ?? 20),
    });

    return {
      count,
      page: queries.page,
      data: rows
    };
  } catch (error) {
    throw error;
  }
}

export const getOneCatService = async (id: number) => {
  try {
    const cat = await DataBase.instance.cat.findByPk(id);

    if (!cat) throw createHttpError(404, 'Cat not found');

    return cat;
  } catch (error){
    throw error;
  }
}
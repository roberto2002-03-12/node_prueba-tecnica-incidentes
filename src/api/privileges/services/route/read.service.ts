import { DataBase } from "../../../../database";
import { Includeable } from 'sequelize/types';

export const getAllRoutesService = async (includeActions: boolean) => {
  try {
    const includeOptions: Includeable[] = [];

    if (includeActions) {
      const includeActionOptions: Includeable = {
        model: DataBase.instance.action,
        as: 'action',
        required: false
      };

      includeOptions.push(includeActionOptions);
    }

    return await DataBase.instance.route.findAll({ include: includeOptions });
  } catch (error) {
    throw error;
  }
};

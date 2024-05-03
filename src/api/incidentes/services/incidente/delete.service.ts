import createHttpError from "http-errors";
import { DataBase } from "../../../../database";
import { deleteImages } from '../../../../shared/services'
import { IIncidente } from "../../model";
import { WhereOptions } from "sequelize";

export const deleteIncidenteService = async (id: number, userId?: number) => {
  try {
    const whereOptions: WhereOptions<IIncidente> = {
      id
    };

    if (userId) whereOptions.createdBy = userId;

    const incidente = await DataBase.instance.incidente.findOne({
      where: {
        id
      },
      include: [{
        model: DataBase.instance.foto,
        as: 'fotos',
        required: false
      }]
    });
    
    if (!incidente) throw createHttpError(404, "No se puede eliminar algo que no existe");
    
    const incidenteAsJson = incidente.toJSON();

    await incidente.destroy();

    if (incidenteAsJson.fotos) await deleteImages(incidenteAsJson.fotos);

    return { message: 'Incidente eliminado' }
  } catch (error) {
    throw error;
  }
}
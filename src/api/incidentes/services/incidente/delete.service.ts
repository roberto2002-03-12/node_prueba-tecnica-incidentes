import createHttpError from "http-errors";
import { DataBase } from "../../../../database";
import { deleteImages } from '../../../../shared/services'

export const deleteIncidenteService = async (id: number) => {
  try {
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
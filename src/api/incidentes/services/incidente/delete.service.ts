import createHttpError from "http-errors";
import { DataBase } from "../../../../database";

export const deleteIncidenteService = async (id: number) => {
  try {
    const incidente = await DataBase.instance.incidente.findByPk(id);
    if (!incidente) throw createHttpError(404, "No se puede eliminar algo que no existe");
    await incidente.destroy()
    return { message: 'Incidente eliminado' }
  } catch (error) {
    throw error;
  }
}
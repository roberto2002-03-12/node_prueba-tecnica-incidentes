import { DataBase } from "../../../../database";
import moment from "moment";
import createHttpError from "http-errors";
import { sendNotificationIncidenteService } from '../../../auth/services/notification/create.service'
import { deleteImages, uploadImage, generateUrl } from '../../../../shared/services'
import config from "../../../../config";
import { CreateIncidente, IFoto } from "../../model";
import { Transaction } from "sequelize";


export const createIncidenteService = async (data: CreateIncidente, createdBy: number, files?: Express.Multer.File[]) => {
  const transaction: Transaction = await DataBase.instance.sequelize.transaction();
  // obtener las fotos, si es que hay
  const fotos: IFoto[] = [];
  
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const extension = files[i].mimetype.split('/')[1];
      const fotoNombre = `${Date.now()}-${i}.${extension}`;
      await uploadImage(files[i].buffer, fotoNombre);
      fotos.push({
        fotoNombre,
        fotoUrl: generateUrl(fotoNombre),
        incidenteId: 0
      });
    }
  }

  try {
    if (data.bloqueId === undefined && data.departamentoId === undefined) throw createHttpError(400, 'Debes por lo menos indicar el departamento o bloque del incidente')

    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const incidente = await DataBase.instance.incidente.create({
      ...data,
      estado: 'pendiente',
      createdBy,
      userId: createdBy,
      createdAt: new Date(dateNowFormat),
      updatedAt: new Date(dateNowFormat),
      updatedBy: createdBy
    }, {
      transaction
    });

    if (fotos !== undefined) {
      const newFotos: IFoto[] = fotos.map(val => {
        return {
          ...val,
          incidenteId: incidente.dataValues.id
        }
      })

      await DataBase.instance.foto.bulkCreate(newFotos, {
        transaction
      })
    }

    await transaction.commit();

    sendNotificationIncidenteService(incidente)

    return incidente;
  } catch (error) {
    await transaction.rollback();
    // no es necesario await
    if (fotos.length >= 1) deleteImages(fotos)
    throw error;
  }
}
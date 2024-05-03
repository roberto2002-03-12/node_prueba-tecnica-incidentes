import { SendMailOptions } from "nodemailer";
import { DataBase } from "../../../../database";
import { sendMail } from "../../../../shared/services";
import config from '../../../../config'
import { CreateIncidente } from "../../../incidentes/model";

export const sendNotificationIncidenteService = async (incidente: CreateIncidente) => {
  try {
    const usersToSend = await DataBase.instance.user.findAll({
      include: {
        model: DataBase.instance.role,
        as: 'role',
        where: {
          roleName: 'incidentes-manager',
          active: true
        },
        required: true
      }
    })

    let lugar = `NO SE HA ESPECIFICADO DONDE`

    if (incidente.bloqueId && !incidente.departamentoId) {
      const bloque = await DataBase.instance.bloque.findOne({
        where: {
          id: incidente.bloqueId
        },
        attributes: ['nroBloque']
      })

      lugar = `lugar de incidente en el bloque ${bloque?.dataValues.nroBloque}`
    } else if (incidente.departamentoId) {
      const departamento = await DataBase.instance.departamento.findOne({
        where: {
          id: incidente.departamentoId
        },
        attributes: ['nroDepartamento']
      })

      lugar = `lugar de incidente en el departamento ${departamento?.dataValues.nroDepartamento}`
    }

    for (let i = 0; i < usersToSend.length; i++) {
      const mailOptions: SendMailOptions = {
        from: `Gestión de incidentes <${config.EMAIL_USE}>`,
        to: usersToSend[i].dataValues.email,
        subject: `Se ha registrado un nuevo incidente`,
        html: `
          <h2>Gestor de incidentes</h2>
          <p>Se ha registrado un nuevo incidente en ${lugar} y se detalla lo siguiente:</p>
          <hr>
          <p>Asunto: ${incidente.asunto}</p>
          <p>${incidente.detalle}</p>
        `
      }

      await sendMail(mailOptions);
    }
  } catch (error) {
    // como esto es asincrono y no se va esperar a que se envie a todos
    // los administrados, en caso de error solo mostrar en la consola.
    console.error(error);
  }
}
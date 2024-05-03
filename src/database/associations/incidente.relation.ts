import { IncidenteStatic, FotoStatic } from '../../api/incidentes/model'
import { BloqueStatic, DepartamentoStatic } from '../../api/ubicacion/models'
import { UserStatic } from '../../api/auth/model'

export const userOneToManyIncidente = (
  {
    user,
    incidente
  } : {
    user: UserStatic;
    incidente: IncidenteStatic 
  }
) => {
  incidente.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'user'
  })
}

export const departamentoAndBloqueOneToManyIncidente = (
  {
    incidente,
    departamento,
    bloque,
  } : {
    incidente: IncidenteStatic;
    departamento: DepartamentoStatic;
    bloque: BloqueStatic;
  }
) => {

  incidente.belongsTo(departamento, {
    foreignKey: 'departamento_id',
    as: 'departamento'
  });

  incidente.belongsTo(bloque, {
    foreignKey: 'bloque_id',
    as: 'bloque'
  });
}

export const incidenteOneToManyFoto = (
  {
    incidente,
    foto
  } : {
    incidente: IncidenteStatic;
    foto: FotoStatic
  }
) => {
  incidente.hasMany(foto, {
    foreignKey: 'incidente_id',
    as: 'fotos'
  })
}
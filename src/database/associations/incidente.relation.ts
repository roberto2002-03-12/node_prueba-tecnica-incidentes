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
  user.hasMany(incidente, {
    foreignKey: 'user_id',
    as: 'incidente'
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
  // departamento.hasMany(incidente, {
  //   foreignKey: 'departamento_id',
  //   as: 'departamento'
  // });

  incidente.belongsTo(departamento, {
    foreignKey: 'departamento_id',
    as: 'departamento'
  });

  // bloque.hasMany(incidente, {
  //   foreignKey: 'bloque_id',
  //   as: 'bloque'
  // });

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
import { BloqueStatic, DepartamentoStatic } from '../../api/ubicacion/models'

export const bloqueOneToManyDepartamento = (
  {
    bloque,
    departamento
  } : {
    bloque: BloqueStatic,
    departamento: DepartamentoStatic
  }
) => {
  bloque.hasMany(departamento, {
    foreignKey: 'bloque_id',
    as: 'bloque_dp'
  });
}
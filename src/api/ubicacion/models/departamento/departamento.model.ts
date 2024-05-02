import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateDepartamento } from './departamento.dto'

export interface IDepartamento {
  id: number;
  nroDepartamento: number;
  propietario: string;
  bloqueId: number;
}

export interface IDepartamentoQueries {
  limit?: number;
  page: number;
}

export interface IDepartamentoModel extends Model<IDepartamento, CreateDepartamento>, IDepartamento, CreateDepartamento {};

export class Departamento extends Model<IDepartamentoModel, IDepartamentoModel> {}

export type DepartamentoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDepartamentoModel
};

export function DepartamentoFactory(sequelize: Sequelize): DepartamentoStatic {
  return <DepartamentoStatic>sequelize.define(
    'departamento', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      nroDepartamento: {
        field: 'nro_departamento',
        allowNull: false,
        type: DataTypes.INTEGER
      },
      propietario: {
        allowNull: true,
        type: DataTypes.STRING(65)
      },
      bloqueId: {
        field: 'bloque_id',
        allowNull: false,
        type: DataTypes.INTEGER
      }
    }, {
      tableName: 'departamento',
      timestamps: false
    }
  )
}
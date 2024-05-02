import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateBloque } from './bloque.dto'

export interface IBloque {
  id: number;
  nroBloque: string;
  detalle: string;
}

export interface IBloqueQueries {
  limit?: number;
  page: number;
}

export interface IBloqueModel extends Model<IBloque, CreateBloque>, IBloque, CreateBloque {};

export class Bloque extends Model<IBloqueModel, IBloqueModel> {}

export type BloqueStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IBloqueModel
};

export function BloqueFactory(sequelize: Sequelize): BloqueStatic {
  return <BloqueStatic>sequelize.define(
    'bloque', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      nroBloque: {
        field: 'nro_bloque',
        allowNull: false,
        type: DataTypes.STRING(25)
      },
      detalle: {
        allowNull: true,
        type: DataTypes.TEXT('tiny')
      }
    }, {
      tableName: 'bloque',
      timestamps: false
    }
  )
}
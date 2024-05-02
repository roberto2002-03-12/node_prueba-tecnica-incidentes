import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface IFoto {
  id?: number;
  fotoNombre: string;
  fotoUrl: string;
  incidenteId: string;
}

export interface IFotoModel extends Model<IFoto>, IFoto {};

export class Foto extends Model<IFotoModel, IFotoModel> {}

export type FotoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IFotoModel
};

export function FotoFactory(sequelize: Sequelize): FotoStatic {
  return <FotoStatic>sequelize.define(
    'foto', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      fotoNombre: {
        field: 'foto_nombre',
        allowNull: false,
        type: DataTypes.STRING(355)
      },
      fotoUrl: {
        field: 'foto_url',
        allowNull: false,
        type: DataTypes.STRING(355)
      },
      incidenteId: {
        field: 'incidente_id',
        allowNull: false,
        type: DataTypes.INTEGER
      }
    }, {
      tableName: 'foto',
      timestamps: false
    }
  )
}
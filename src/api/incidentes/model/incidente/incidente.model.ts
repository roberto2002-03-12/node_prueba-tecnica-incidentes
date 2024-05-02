import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateIncidente } from './incidente.dto'

export type IncidenteEstadoType = 'progresando' | 'terminado' | 'pendiente';

export interface IIncidente {
  id: number;
  asunto: string;
  estado: IncidenteEstadoType;
  detalle: string;

  userId: number;
  departamentoId: number;
  bloqueId: number;

  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface IIncidenteQuery {
  page: number;
  limit?: number;
  estado?: 'progresando' | 'terminado' | 'pendiente';
  bloqueId?: number;
  createdAtStart?: string;
  createdAtEnd?: string;
}

export interface IIncidenteModel extends Model<IIncidente, CreateIncidente>, IIncidente, CreateIncidente {};

export class Incidente extends Model<IIncidenteModel, IIncidenteModel> {}

export type IncidenteStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IIncidenteModel
};

export function IncidenteFactory(sequelize: Sequelize): IncidenteStatic {
  return <IncidenteStatic>sequelize.define(
    'incidente', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      asunto: {
        allowNull: false,
        type: DataTypes.STRING(45)
      },
      estado: {
        allowNull: false,
        type: DataTypes.STRING(45)
      },
      detalle: {
        allowNull: false,
        type: DataTypes.TEXT('tiny')
      },
      userId: {
        field: 'user_id',
        allowNull: true,
        type: DataTypes.INTEGER
      },
      bloqueId: {
        field: 'bloque_id',
        allowNull: true,
        type: DataTypes.INTEGER
      },
      departamentoId: {
        field: 'departamento_id',
        allowNull: true,
        type: DataTypes.INTEGER
      },
      createdBy: {
        field: 'created_by',
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: true,
        type: DataTypes.INTEGER
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'incidente',
      timestamps: false
    }
  )
}
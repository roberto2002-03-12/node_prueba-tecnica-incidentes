import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateRoute, UpdateRoute } from './route.dto';
import { IAction } from '../action/action.model';

export interface IRoute {
  id: number;
  url: string;
  description: string;

  action: IAction[]

  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;
};


export interface IRouteModel extends Model<IRoute, CreateRoute | UpdateRoute>, IRoute {};

export class Route extends Model<IRouteModel, IRoute> {};

export type RouteStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IRouteModel
};

export function RouteFactory(sequelize: Sequelize): RouteStatic {
  return <RouteStatic>sequelize.define(
    'route',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_by: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_by: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      timestamps: false,
      tableName: 'route'
    }
  )
}
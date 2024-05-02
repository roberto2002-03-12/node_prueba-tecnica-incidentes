import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateAction } from './action.dto';

export interface IAction {
  id: number;
  actionName: string;
  routeId: number;
  
  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;
};

export interface IActionJson {
  id: number;
  actionName: string;
}

export interface IActionModel extends Model<IAction, CreateAction>, IAction {};

export class Action extends Model<IActionModel, IAction> {};

export type ActionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IActionModel
};

export function ActionFactory(sequelize: Sequelize): ActionStatic {
  return <ActionStatic>sequelize.define(
    'action', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      actionName: {
        field: 'action_name',
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      routeId: {
        field: 'route_id',
        allowNull: false,
        type: DataTypes.INTEGER
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
        allowNull: false,
        type: DataTypes.INTEGER
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'action',
      timestamps: false
    }
  )
}
import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateRoleAction } from './relation.dto';

export interface IRoleAction {
  id: number;
  roleId: number;
  actionId: number;

  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;
};

export interface RoleActionModel extends Model<IRoleAction | CreateRoleAction>, IRoleAction {}
export class RoleAction extends Model<RoleActionModel, IRoleAction> {}
export type RoleActionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RoleActionModel
}

export function RoleActionFactory(sequelize: Sequelize): RoleActionStatic {
  return <RoleActionStatic>sequelize.define(
    'role_action',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roleId: {
        field: 'role_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      actionId: {
        field: 'action_id',
        type: DataTypes.INTEGER,
        allowNull: false,
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
    },
    {
      timestamps: false,
      tableName: 'role_action'
    }
  )
}
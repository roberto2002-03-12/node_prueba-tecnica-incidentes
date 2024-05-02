import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { IAction, IActionJson, IRoute } from '../'
import { CreateRole, UpdateRole } from './role.dto';
import { OrderType } from '../../../../shared/models';

export interface IRole {
  id: number;
  roleName: string;
  active: boolean
  description: string;
  
  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;

  route?: IRoute[];
  action?: IAction[];
};

export interface IRoleQuery {
  order?: OrderType;
  roleName?: string;
  active?: boolean;
  routeId?: number;
  createdAtStart?: string;
  createdAtEnd?: string;
  limit?: number;
  page: number;
};

export interface IRoleJson {
  id: number;
  roleName: string;
  action: IActionJson[]
}

export interface IRouteCount {
  count: number;
};

export interface IRoleModel extends Model<IRole, CreateRole | UpdateRole>, IRole {};

export class Role extends Model<IRoleModel, IRole> {};

export type RoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IRoleModel
};

export function RoleFactory(sequelize: Sequelize): RoleStatic {
  return <RoleStatic>sequelize.define(
    'role', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      roleName: {
        field: 'role_name',
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT('tiny')
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
      tableName: 'role',
      timestamps: false
    }
  )
} 
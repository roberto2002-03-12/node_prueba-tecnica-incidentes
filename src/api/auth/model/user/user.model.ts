import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateUser } from './user.dto';
import { IRole } from '../../../privileges/model'
import { IProfile } from '../../../profile/model/profile.model'
import { OrderType } from '../../../../shared/models'

export interface IUser {
  id: number;
  email: string;
  password?: string;
  loggedToken: string;
  recoveryToken: string;

  active: boolean;

  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;

  role: IRole[];
  profile: IProfile;
  routes?: string[];
};

export interface IUserResult {
  id: number;
  email: string;
  password?: string;
  loggedToken: string;
  recoveryToken: string;
  
  active: boolean;

  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;
};

export interface IUserQuery {
  order?: OrderType;
  email?: string;
  fullName?: string;
  roleName?: string;
  active?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  limit?: number;
  page: number;
};

export interface IUserModel extends Model<IUser, CreateUser>, IUser, CreateUser {};

export class User extends Model<IUserModel, IUser> {};

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserModel
};

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define(
    'user', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(105)
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      loggedToken: {
        field: 'logged_token',
        allowNull: true,
        type: DataTypes.STRING
      },
      recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
      tableName: 'user',
      timestamps: false
    }
  )
}
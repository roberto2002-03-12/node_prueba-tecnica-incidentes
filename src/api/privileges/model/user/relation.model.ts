import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateUserRole } from './relation.dto';

export interface IUserRole {
  id: number;
  user_id: number;
  role_id: number;

  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;
};

export interface UserRoleModel extends Model<IUserRole, CreateUserRole>, IUserRole {}
export class UserRole extends Model<UserRoleModel, IUserRole> {}
export type UserRoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserRoleModel
}

export function UserRoleFactory(sequelize: Sequelize): UserRoleStatic {
  return <UserRoleStatic>sequelize.define(
    'user_role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
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
      tableName: 'user_role'
    }
  )
}
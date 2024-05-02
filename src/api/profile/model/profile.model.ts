import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateProfile } from './'

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  birth: Date;
  phoneNumber: string;
  userId: number;

  created_by: number;
  created_at: string;
  updated_by: number;
  updated_at: string;
};

export interface IProfileModel extends Model<IProfile, CreateProfile>, IProfile, CreateProfile {};

export class Profile extends Model<IProfileModel, IProfile> {};

export type ProfileStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IProfileModel
};

export function ProfileFactory(sequelize: Sequelize): ProfileStatic {
  return <ProfileStatic>sequelize.define(
    'profile', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      firstName: {
        field: 'first_name',
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: DataTypes.STRING
      },
      birth: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      phoneNumber: {
        field: 'phone_number',
        allowNull: false,
        type: DataTypes.STRING
      },
      userId: {
        field: 'user_id',
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
        allowNull: true,
        type: DataTypes.INTEGER
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'profile',
      timestamps: false
    }
  )
}
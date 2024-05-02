import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { CreateCat, UpdateCat } from './cat.dto';

export interface ICat {
  id: number;
  name: string;
  race: string; // you can add category but it's just a demo, so i only need the basics
  birth: Date;
  price: number;
  photoName: string;
  photoUrl: string;

  // i could add "favorite cat" by user, but i'll do it on user client side, since that would
  // be something new for me, anyway this model you won't need it, im pretty sure, it's just a demo
  // after all
};

export interface ICatQuery {
  name?: string;
  race?: string;
  birthStart?: string;
  birthEnd?: string;
  highestPrice?: number;
  minimumPrice?: number;
  order?: string;
  page: number;
  limit?: number;
}

export interface ICatModel extends Model<ICat, CreateCat | UpdateCat>, ICat {};

export class Cat extends Model<ICatModel, ICat> {};

export type CatStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICatModel
};

export function CatFactory(sequelize: Sequelize): CatStatic {
  return <CatStatic>sequelize.define(
    'cat', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      race: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
      },
      photoName: {
        field: 'photo_name',
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      photoUrl: {
        field: 'photo_url',
        type: DataTypes.STRING(300),
        allowNull: true
      },
    }, {
      tableName: 'cat',
      timestamps: false
    }
  )
}
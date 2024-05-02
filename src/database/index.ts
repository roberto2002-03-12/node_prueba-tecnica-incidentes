import { Sequelize } from 'sequelize';
import config from '../config';
import { UserStatic, UserFactory } from '../api/auth/model';
import {  
  RouteStatic, RouteFactory,
  RoleStatic, RoleFactory,
  ActionStatic, ActionFactory,

  // relation tables
  UserRoleStatic, UserRoleFactory,
  RoleActionStatic, RoleActionFactory
} from '../api/privileges/model';
import { ProfileStatic, ProfileFactory } from '../api/profile/model/profile.model';

import { CatStatic, CatFactory } from '../api/cats/model';

import { IncidenteStatic, IncidenteFactory, FotoStatic, FotoFactory } from '../api/incidentes/model'
import { 
  BloqueStatic, BloqueFactory,
  DepartamentoStatic, DepartamentoFactory 
} from '../api/ubicacion/models'

// relations
import {
  userHasOneProfile, userManyToManyRole,
  routeOneToManyAction, roleManyToManyAction,
  userOneToManyIncidente, departamentoAndBloqueOneToManyIncidente,
  bloqueOneToManyDepartamento, incidenteOneToManyFoto
} from './associations';

export class DataBase {
  private static _instance: DataBase;
  public sequelize: Sequelize;
  private _config = config;
  public user: UserStatic;
  public profile: ProfileStatic;
  public route: RouteStatic;
  public role: RoleStatic;
  public action: ActionStatic;
  public cat: CatStatic;
  public incidente: IncidenteStatic;
  public departamento: DepartamentoStatic;
  public bloque: BloqueStatic;
  public foto: FotoStatic;
  
  // relation tables
  public userRole: UserRoleStatic;
  public roleAction: RoleActionStatic;

  constructor () {
    this.sequelize = new Sequelize(
      this._config.DB_NAME,
      this._config.DB_USER,
      this._config.DB_PASS,
      {
        host: this._config.DB_HOST,
        port: Number(this._config.DB_PORT),
        logging: false,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      }
    )

    this.user = UserFactory(this.sequelize);
    this.profile = ProfileFactory(this.sequelize);
    this.route = RouteFactory(this.sequelize);
    this.role = RoleFactory(this.sequelize);
    this.action = ActionFactory(this.sequelize);
    this.cat = CatFactory(this.sequelize);
    this.incidente = IncidenteFactory(this.sequelize);
    this.departamento = DepartamentoFactory(this.sequelize);
    this.bloque = BloqueFactory(this.sequelize);
    this.foto = FotoFactory(this.sequelize);
    
    // relation tables

    this.userRole = UserRoleFactory(this.sequelize);
    this.roleAction = RoleActionFactory(this.sequelize);

    this.associations();
    this.connectDB();
  }

  public static get instance(): DataBase {
    return this._instance || (this._instance = new this())
  }

  private connectDB(): void {
    const attemptConnection = () => this.sequelize.authenticate()
    .then(() => {
      console.log('Database is running')
    })
    .catch((err) => {
      console.error(err)

      setTimeout(attemptConnection, 60000);
    });

    attemptConnection();
  }

  private associations(): void {
    userHasOneProfile({
      user: this.user,
      profile: this.profile
    });

    userManyToManyRole({
      user: this.user,
      role: this.role
    });

    roleManyToManyAction({
      role: this.role,
      action: this.action
    });

    routeOneToManyAction({
      route: this.route,
      action: this.action
    });

    departamentoAndBloqueOneToManyIncidente({
      bloque: this.bloque,
      departamento: this.departamento,
      incidente: this.incidente
    });

    userOneToManyIncidente({
      incidente: this.incidente,
      user: this.user
    });

    incidenteOneToManyFoto({
      foto: this.foto,
      incidente: this.incidente
    });

    bloqueOneToManyDepartamento({
      bloque: this.bloque,
      departamento: this.departamento
    })
  }
}
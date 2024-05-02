import express, { Application, Response, Request, NextFunction } from 'express';
// agregar importaciones de rutas aquí

import { Router } from 'express';

import { router as UserRouter } from './auth/router/router';
import { router as ProfileRouter } from './profile/router/routes';
import { router as PrivilegesRouter } from './privileges/router/router';
import { router as CatRouter } from './cats/router/router';
import { router as UbicacionRouter } from './ubicacion/routes/router';
import { router as IncidenteRouter } from './incidentes/routes/router';

import { jwtStrategy, localStrategy } from '../utils/auth'
import passport from 'passport';

import http, { Server as HttpServer } from 'http';
import cors from 'cors';

passport.use(jwtStrategy);
passport.use(localStrategy);

export default class Server {
  public _app: Application;
  private _port: number;
  private _router: Router;
  private _http: HttpServer;

  constructor(port: number) {
    this._app = express();
    this._router = Router();
    this._port = port;
    this._http = http.createServer(this._app);

    this.middlewares();
    this.routes();
    this.errors();
  };

  static init(port: number): Server {
    return new Server(port)
  }

  middlewares(): void {
    this._app.use(cors({ credentials: true }));

    this._app.use(express.json({ limit: '350mb' }));
    this._app.use(
      express.urlencoded({
        limit: '350mb',
        extended: true,
        parameterLimit: 350000,
      })
    );

    // recuerda crear passport
    this._app.use(passport.initialize());
  };

  routes(): void {
    this._app.use('/api/v1', this._router);

    this._router.use('/auth', UserRouter);
    
    // authenticate
    this._router.use(passport.authenticate('jwt', { session: false }));

    this._router.use('/profile', ProfileRouter);
    this._router.use('/privileges', PrivilegesRouter);
    this._router.use('/cat', CatRouter);
    this._router.use('/ubicacion', UbicacionRouter);
    this._router.use('/incidente', IncidenteRouter);
  };

  errors(): void {
    this._router.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error(`The route: "${req.originalUrl}" isn't declared`)
      res.status(404);
      next(error);
    });

    this._router.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error(error.stack);
      res.status(error.status || 500).json({
        status: error.status,
        message: error.message,
        stack: error.stack
      });
    });
  };

  start(callback: () => void): void {
    this._http.listen(this._port, callback);
  }
};
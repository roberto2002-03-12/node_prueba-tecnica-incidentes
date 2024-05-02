import { Router } from 'express'

import {
  createBloqueController, deleteOneBloqueByIdController,
  getAllBloquesController, getAllBloquesForSelectController
} from '../controllers/bloque.controller'

import {
  createDepartamentoController, deleteOneDepartamentoByIdController,
  getAllDepartamentoController, getAllDepartamentoForSelectController
} from '../controllers/departamento.controller'

import { validateMiddleware } from '../../../middlewares'
import { checkCredentials } from '../../privileges/middleware/privileges.middleware'

import { 
  createBloqueSchema, createDepartamentoSchema,
  getByIdSchema, getByQueriesSchema
} from '../validation';

export const router: Router = Router();

router.post(
  '/departamento', 
  checkCredentials(['create-departamento']), 
  validateMiddleware(createDepartamentoSchema, 'body'), 
  createDepartamentoController
);
router.get(
  '/departamento',
  checkCredentials(['read-departamento']),
  validateMiddleware(getByQueriesSchema, 'query'),
  getAllDepartamentoController
);
router.get(
  '/departamento/select',
  checkCredentials(['read-departamento']),
  getAllDepartamentoForSelectController
);
router.delete(
  '/departamento/:id',
  checkCredentials(['delete-departamento']),
  validateMiddleware(getByIdSchema, 'params'),
  deleteOneDepartamentoByIdController
)

router.post(
  '/bloque', 
  checkCredentials(['create-bloque']), 
  validateMiddleware(createBloqueSchema, 'body'), 
  createBloqueController
);
router.get(
  '/bloque',
  checkCredentials(['read-bloque']),
  validateMiddleware(getByQueriesSchema, 'query'),
  getAllBloquesController
);
router.get(
  '/bloque/select',
  checkCredentials(['read-bloque']),
  getAllBloquesForSelectController
);
router.delete(
  '/bloque/:id',
  checkCredentials(['delete-bloque']),
  validateMiddleware(getByIdSchema, 'params'),
  deleteOneBloqueByIdController
)
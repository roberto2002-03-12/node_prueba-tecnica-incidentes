import { Router } from 'express';

import {
  getAllIncidenteByQueriesController, getOneIncidenteByIdController,
  updateIncidenteController
} from '../controller/incidente.controller'

import {
  createIncidenteController, deleteIncidenteController,
  getAllIncidenteByQueriesForClientsController, getOneIncidenteByIdForClientController, 
  updateIncidenteForClientController
} from '../controller/incidente-cliente.controller'

import { validateMiddleware } from '../../../middlewares'
import { checkCredentials } from '../../privileges/middleware/privileges.middleware'

import { 
  getByIdSchema, updateIncidenteSchema, 
  getAllIncidenteByQuerySchema, updateStatusSchema
} from '../validation/incidente.validation'

import { upload } from '../../../middlewares/images.middleware'

export const router: Router = Router();

// admin side
router.get(
  '/',
  checkCredentials(['read-incidente']),
  validateMiddleware(getAllIncidenteByQuerySchema, 'query'),
  getAllIncidenteByQueriesController
)
router.get(
  '/:id',
  checkCredentials(['read-incidente']),
  validateMiddleware(getByIdSchema, 'params'),
  getOneIncidenteByIdController
)
router.put(
  '/:id',
  checkCredentials(['edit-incidente']),
  validateMiddleware(getByIdSchema, 'params'),
  validateMiddleware(updateStatusSchema, 'body'),
  updateIncidenteController
)

// client side
router.get(
  '/client/all',
  validateMiddleware(getAllIncidenteByQuerySchema, 'query'),
  getAllIncidenteByQueriesForClientsController
)
router.get(
  '/client/:id',
  validateMiddleware(getByIdSchema, 'params'),
  getOneIncidenteByIdForClientController
)
router.post(
  '/client',
  upload.array('foto', 8),
  createIncidenteController
)
router.put(
  '/client/:id',
  validateMiddleware(getByIdSchema, 'params'),
  validateMiddleware(updateIncidenteSchema, 'body'),
  updateIncidenteForClientController
)
router.delete(
  '/client/:id',
  validateMiddleware(getByIdSchema, 'params'),
  deleteIncidenteController
)
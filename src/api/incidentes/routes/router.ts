import { Router } from 'express';

import {
  createIncidenteController, getAllIncidenteByQueriesController,
  deleteIncidenteController, getOneIncidenteByIdController,
  updateIncidenteController
} from '../controller/incidente.controller'

import { validateMiddleware } from '../../../middlewares'
import { checkCredentials } from '../../privileges/middleware/privileges.middleware'

import { 
  createIncidenteSchema, getByIdSchema,
  updateIncidenteSchema, getAllIncidenteByQuerySchema
} from '../validation/incidente.validation'

export const router: Router = Router();

router.get(
  '/',
  validateMiddleware(getAllIncidenteByQuerySchema, 'query'),
  getAllIncidenteByQueriesController
)
router.get(
  '/:id',
  validateMiddleware(getByIdSchema, 'params'),
  getOneIncidenteByIdController
)
router.post(
  '/',
  validateMiddleware(createIncidenteSchema, 'body'),
  createIncidenteController
)
router.put(
  '/:id',
  validateMiddleware(getByIdSchema, 'params'),
  validateMiddleware(updateIncidenteSchema, 'body'),
  updateIncidenteController
)
router.delete(
  '/:id',
  validateMiddleware(getByIdSchema, 'params'),
  deleteIncidenteController
)
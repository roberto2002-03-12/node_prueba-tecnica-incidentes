import { Router } from 'express';

import {
  createIncidenteController, getAllIncidenteByQueriesController,
  deleteIncidenteController, getOneIncidenteByIdController,
  updateIncidenteController, getAllIncidenteByQueriesForClientsController
} from '../controller/incidente.controller'

import { validateMiddleware } from '../../../middlewares'
import { checkCredentials } from '../../privileges/middleware/privileges.middleware'

import { 
  getByIdSchema, updateIncidenteSchema, 
  getAllIncidenteByQuerySchema
} from '../validation/incidente.validation'

import { upload } from '../../../middlewares/images.middleware'

export const router: Router = Router();

router.get(
  '/',
  validateMiddleware(getAllIncidenteByQuerySchema, 'query'),
  getAllIncidenteByQueriesController
)
router.get(
  '/client',
  validateMiddleware(getAllIncidenteByQuerySchema, 'query'),
  getAllIncidenteByQueriesForClientsController
)
router.get(
  '/:id',
  validateMiddleware(getByIdSchema, 'params'),
  getOneIncidenteByIdController
)
router.post(
  '/',
  upload.array('foto', 8),
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
// router.post(
//   '/images',
//   upload.array('foto', 8),
//   tryImagesController
// )
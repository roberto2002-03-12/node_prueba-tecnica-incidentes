import { Router } from 'express';

import {
  createCatController, updateCatController,
  deleteCatController, getOneCatController,
  getAllCatsController
} from '../controller/cat.controller';

import { validateMiddleware } from '../../../middlewares';
import { checkCredentials } from '../../privileges/middleware/privileges.middleware';

import {
  createCatSchema, updateCatSchema,
  getByIdSchema, getAllCatsSchema
} from '../validation/cat.schema';

export const router: Router = Router();

router.post('/', checkCredentials(['create-cat']), validateMiddleware(createCatSchema, 'body'), createCatController);
router.put('/:id', checkCredentials(['edit-cat']), validateMiddleware(getByIdSchema, 'params'), validateMiddleware(updateCatSchema, 'body'), updateCatController);
router.delete('/:id', checkCredentials(['delete-cat']), validateMiddleware(getByIdSchema, 'params'), deleteCatController);
router.get('/:id', checkCredentials(['read-cat']), validateMiddleware(getByIdSchema, 'params'), getOneCatController);
router.get('/', checkCredentials(['read-cat']), validateMiddleware(getAllCatsSchema, 'query'), getAllCatsController);
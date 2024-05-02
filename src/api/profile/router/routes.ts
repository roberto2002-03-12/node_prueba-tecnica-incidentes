import { Router } from 'express';
import { updateProfileController } from '../controller/controller';
import {
  updateProfileSchema
} from '../validation/profile.schema';
import { validateMiddleware } from '../../../middlewares'

export const router: Router = Router();

router.put('/', validateMiddleware(updateProfileSchema, 'body'), updateProfileController);
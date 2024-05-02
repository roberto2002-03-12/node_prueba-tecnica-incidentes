import { Router } from 'express';
import { signTokenController } from '../controller/controller';
import { 
  getAllUsersController, registerController,
  createUserAndProfileController, sendCodeRecoveryController, 
  changeForgotPasswordController, changePasswordController,
  getUserByIdController, desactivateOrActivateUserController
} from '../controller/user.controller';
import {
  getByIdSchema, getAllUsersSchema,
  changePasswordSchema, changeForgotPasswordSchema,
  sendRecoverySchema, loginSchema,
  createUserAndProfileSchema, registerSchema
} from '../validation/user.schema';
import { checkCredentials } from '../../privileges/middleware/privileges.middleware';
import { validateMiddleware } from '../../../middlewares';
import passport from 'passport';

export const router: Router = Router();

router.get('/hola', (req, res) => {
  return res.status(201).json({message: 'Hola'})
});

router.post('/register', validateMiddleware(registerSchema, 'body'), registerController);
router.put('/send-recovery', validateMiddleware(sendRecoverySchema, 'body'), sendCodeRecoveryController);
router.put('/change-forgot-password', validateMiddleware(changeForgotPasswordSchema, 'body'), changeForgotPasswordController);

router.post('/login', validateMiddleware(loginSchema, 'body'), passport.authenticate('local', { session: false }), signTokenController);

router.patch(
  '/user/change-password',
  passport.authenticate('jwt', { session: false }),
  validateMiddleware(changePasswordSchema, 'body'),
  changePasswordController
);

router.post(
  '/user',
  passport.authenticate('jwt', { session: false }),
  checkCredentials(['create-user', 'assign-role']),
  validateMiddleware(createUserAndProfileSchema, 'body'),
  createUserAndProfileController
);

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  checkCredentials(['read-user']), // read-user 8
  validateMiddleware(getAllUsersSchema, 'query'),
  getAllUsersController
);

router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  checkCredentials(['read-user']), // read-user 8
  validateMiddleware(getByIdSchema, 'params'),
  getUserByIdController
);

router.patch(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  checkCredentials(['edit-user']),
  validateMiddleware(getByIdSchema, 'params'),
  desactivateOrActivateUserController
);
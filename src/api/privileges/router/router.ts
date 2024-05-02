import { Router } from 'express';

import {
  checkCredentials
} from '../middleware/privileges.middleware';

import { 
  createRoleController, getAllRolesController,
  assignRoleToUserMassiveController, desactivateOrActivateRoleController,
  getOneRoleController, updateAssignMassiveActionToRoleController,
  getRolesForSelectController
} from '../controller/role.controller';

import {
  createRouteController, getAllRoutesController,
  // consultPrivilegeController
} from '../controller/route.controller';

import {
  createActionController, assignMassiveActionsToRoleController
} from '../controller/action.controller';

import { validateMiddleware } from '../../../middlewares'

import { 
  createRoleSchema, assignRoleToUserSchema,
  getByIdSchema, getAllRolesSchema, updateAssignMassiveActionToRoleSchema,
  includeActionsOnSelectSchema
} from '../validation/role.schema';

import {
  getAllRoutesSchema
} from '../validation/route.schema';

// import {
//   assignMassiveActionsToRoleSchema
// } from '../validation/action.schema';

export const router: Router = Router();

router.post(
  '/role', 
  checkCredentials(['create-role']),
  validateMiddleware(createRoleSchema, 'body'),
  createRoleController
); // create-role 1
router.post(
  '/role/assign', 
  checkCredentials(['assign-role']),
  validateMiddleware(assignRoleToUserSchema, 'body'), 
  assignRoleToUserMassiveController,
); // assign-role 2
router.patch(
  '/role/:id', 
  checkCredentials(['desactivate-role']),
  validateMiddleware(getByIdSchema, 'params'),
  desactivateOrActivateRoleController
); // desactivate-role 3
router.get(
  '/role', 
  checkCredentials(['read-role']), 
  validateMiddleware(getAllRolesSchema, 'query'),
  getAllRolesController
); // read-role 4
router.get(
  '/role/:id', 
  checkCredentials(['read-role']), 
  validateMiddleware(getByIdSchema, 'params'),
  validateMiddleware(includeActionsOnSelectSchema, 'query'),
  getOneRoleController
); // read-role
router.get(
  '/role-select',
  checkCredentials(['read-role']),
  getRolesForSelectController
);
router.put(
  '/role/:id',
  validateMiddleware(updateAssignMassiveActionToRoleSchema, 'body'), 
  updateAssignMassiveActionToRoleController
);
// router.get('/try', consultPrivilegeController);

// router.post('/route', createRouteController); // create-route
router.get(
  '/route', 
  validateMiddleware(getAllRoutesSchema, 'query'), 
  checkCredentials(['read-route']), 
  getAllRoutesController
); // read-route 5
// router.post('/route/assign', checkCredentials( 'assign-route'), assignRouteToRoleController); // assign-route 6

// router.post('/action', createActionController); // post-action
// this no needed anymore, you can just add 'read-action' to createRoleController
// or you can just leave it by one, why would you assign the privilege to create role
// to someone if the person can't assign privileges
// router.post( 
//   '/action/assign', 
//   validateMiddleware(assignMassiveActionsToRoleSchema, 'body'), 
//   checkCredentials(['assign-action']),
//   assignMassiveActionsToRoleController
// ); // assign-action 7
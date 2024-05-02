import Joi, { boolean } from 'joi';

const id = Joi.number().min(1);

// create role
const roleName = Joi.string().max(45);
const description = Joi.string().max(250);

// queries
const active = Joi.boolean();
const order = Joi.string().valid('ASC', 'DESC');
const createdAtStart = Joi.date();
const createdAtEnd = Joi.date();
const limit = Joi.number().max(100).min(1);
const page = Joi.number().min(1);

// for massive create 
const avarageDate = Joi.date().optional();

const actionSchema = Joi.object({
  id: id.required(),
  actionName: Joi.string().max(45).optional(),
  role_action: Joi.object().optional()
});

export const createRoleSchema = Joi.object({
  roleName: roleName.required(),
  description: description.optional(),
  action: Joi.array().items(actionSchema).optional()
});

/*
  "id": 1,
  "active": true,
  "roleName": "super-admin",
  "description": "power of everything",
  "created_by": 1,
  "created_at": "2024-02-29T21:28:34.000Z",
  "updated_by": 7,
  "updated_at": "2024-03-09T11:56:55.000Z",
  "user_role": {
    "id": 1,
    "user_id": 7,
    "role_id": 1,
    "created_by": 7,
    "created_at": "2024-03-01T17:27:56.000Z",
    "updated_by": 7,
    "updated_at": "2024-03-01T17:27:56.000Z"
  }
*/

const roleSchemaForAssign = Joi.object({
  id: id.required(),
  roleName: roleName.optional(),
  user_role: Joi.object({
    id: id.optional(),
    user_id: id.optional(),
    role_id: id.optional(),
    created_at: avarageDate,
    updated_at: avarageDate,
    created_by: id.optional(),
    updated_by: id.optional(),
  }).optional()

});

export const assignRoleToUserSchema = Joi.object({
  userId: id.required(),
  roles: Joi.array().items(roleSchemaForAssign).required()
});

export const includeActionsOnSelectSchema = Joi.object({
  includeActions: Joi.string().valid('true').optional()
});

export const getAllRolesSchema = Joi.object({
  order: order.optional(),
  roleName: roleName.optional(),
  active: active.optional(),
  routeId: id.optional(),
  createdAtStart: createdAtStart.optional(),
  createdAtEnd: createdAtEnd.optional(),
  limit: limit.optional(),
  page: page.required()
});

export const getByIdSchema = Joi.object({
  id: id.required()
});

export const updateAssignMassiveActionToRoleSchema = Joi.object({
  roleName: roleName.optional(),
  description: description.optional(),
  action: Joi.array().items(actionSchema).optional()
});


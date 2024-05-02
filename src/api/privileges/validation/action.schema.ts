import Joi from 'joi';

const id = Joi.number().min(1);
const roleName = Joi.string().max(45);
const actionName = Joi.string().max(45);

const actionSchema = Joi.object({
  id: id.required(),
  actionName: actionName.optional()
});

export const assignMassiveActionsToRoleSchema = Joi.object({
  id: id.required(),
  roleName: roleName.optional(),
  action: Joi.array().items(actionSchema)
});
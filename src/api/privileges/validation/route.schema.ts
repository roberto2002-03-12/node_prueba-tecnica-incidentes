import Joi from 'joi';

const includeActions = Joi.boolean();

export const getAllRoutesSchema = Joi.object({
  includeActions: includeActions.required()
});


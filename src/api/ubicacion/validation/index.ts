import Joi from 'joi'

export * from './bloque.schema'
export * from './departamento.schema'

export const getByIdSchema = Joi.object({
  id: Joi.number().min(1).required()
});

export const getByQueriesSchema = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().optional()
});
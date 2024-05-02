import Joi from "joi";

const id = Joi.number().min(1);
const asunto = Joi.string().max(45);
const estado = Joi.string().max(45).valid('progresando', 'terminado', 'pendiente')
const detalle = Joi.string().max(255);

const departamentoId = Joi.number().min(1);
const bloqueId = Joi.number().min(1);

// queries
const page = Joi.number().min(1);
const limit = Joi.number().min(20);
const createdAtStart = Joi.date();
const createdAtEnd = Joi.date();

export const createIncidenteSchema = Joi.object({
  asunto: asunto.required(),
  estado: estado.required(),
  detalle: detalle.required(),
  departamentoId: departamentoId.optional(),
  bloqueId: bloqueId.optional(),
});

export const updateIncidenteSchema = Joi.object({
  asunto: asunto.optional(),
  estado: estado.optional(),
  detalle: detalle.optional(),
  departamentoId: departamentoId.optional(),
  bloqueId: bloqueId.optional(),
});

export const getAllIncidenteByQuerySchema = Joi.object({
  page: page.required(),
  limit: limit.optional(),
  estado: estado.optional(),
  bloqueId: id.optional(),
  createdAtStart: createdAtStart.optional(),
  createdAtEnd: createdAtEnd.optional()
});

export const getByIdSchema = Joi.object({
  id: id.required()
});
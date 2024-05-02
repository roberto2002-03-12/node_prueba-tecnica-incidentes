import Joi from "joi";

const nroBloque = Joi.string().max(25).min(1);
const detalle = Joi.string().max(255);

export const createBloqueSchema = Joi.object({
  nroBloque: nroBloque.required(),
  detalle: detalle.optional()
});

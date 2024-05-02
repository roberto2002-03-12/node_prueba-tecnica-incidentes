import Joi from "joi";

const nroDepartamento = Joi.number();
const propietario = Joi.string().max(65);
const bloqueId = Joi.number().min(1);

export const createDepartamentoSchema = Joi.object({
  nroDepartamento: nroDepartamento.required(),
  propietario: propietario.optional(),
  bloqueId: bloqueId.required()
});

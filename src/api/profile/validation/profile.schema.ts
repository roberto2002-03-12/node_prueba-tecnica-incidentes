import Joi from 'joi';

const firstName = Joi.string().max(45);
const lastName = Joi.string().max(45);
const birth = Joi.date();
const phoneNumber = Joi.string().regex(/^[0-9()+\s]+$/).message('El número de teléfono solo puede contener "+", "(", ")", y números');

export const updateProfileSchema = Joi.object({
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  birth: birth.optional(),
  phoneNumber: phoneNumber.optional()
});
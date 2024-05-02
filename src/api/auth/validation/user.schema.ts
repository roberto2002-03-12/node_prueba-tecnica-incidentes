import Joi from 'joi';

const id = Joi.number().min(1);

// create user
const email = Joi.string().email();
const password = Joi.string().min(8);
const firstName = Joi.string()
const lastName = Joi.string();
const birth = Joi.date();
const phoneNumber = Joi.string().max(15);

// recovery
const recoveryToken = Joi.string();

// queries
const active = Joi.boolean();
const order = Joi.string().valid('ASC', 'DESC');
const fullName = Joi.string().max(85);
const roleName = Joi.string().max(45);
const createdAtStart = Joi.date();
const createdAtEnd = Joi.date();
const limit = Joi.number().max(100).min(1);
const page = Joi.number().min(1);

const roleAssignedSchema = Joi.object({
  id: id.required(),
  roleName: roleName.optional()
});

export const createUserAndProfileSchema = Joi.object({
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }).required(),
  profile: Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    birth: birth.required(),
    phoneNumber: phoneNumber.required()
  }).required(),
  role: Joi.array().items(roleAssignedSchema).optional()
});

export const registerSchema = Joi.object({
  user: {
    email: email.required(),
    password: password.required(),
  },
  profile: {
    firstName: firstName.required(),
    lastName: lastName.required(),
    birth: birth.required(),
    phoneNumber: phoneNumber.required()
  }
});

export const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

export const sendRecoverySchema = Joi.object({
  email: email.required()
});

export const changeForgotPasswordSchema = Joi.object({
  recoveryToken: recoveryToken.required(),
  newPassword: password.required()
});

export const changePasswordSchema = Joi.object({
  newPassword: password.required()
});

export const getAllUsersSchema = Joi.object({
  order: order.optional(),
  fullName: fullName.optional(),
  email: Joi.string().optional(),
  roleName: roleName.optional(),
  active: active.optional(),
  createdAtStart: createdAtStart.optional(),
  createdAtEnd: createdAtEnd.optional(),
  limit: limit.optional(),
  page: page.required()
});

export const getByIdSchema = Joi.object({
  id: id.required()
});
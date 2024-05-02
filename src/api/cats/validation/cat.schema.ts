import Joi from 'joi';

const id = Joi.number().min(1);
const name = Joi.string().max(45);
const race = Joi.string().max(35);
const birth = Joi.date();
const price = Joi.number();
const order = Joi.string().valid('ASC', 'DESC')
const photoUrl = Joi.string();
const photoName = Joi.string();

export const createCatSchema = Joi.object({
  name: name.required(),
  race: race.required(),
  birth: birth.required(),
  price: price.required(),
  photoUrl: photoUrl.optional(),
  photoName: photoName.optional()
});

export const updateCatSchema = Joi.object({
  name: name.optional(),
  race: race.optional(),
  birth: birth.optional(),
  price: price.optional(),
  photoUrl: photoUrl.optional(),
  photoName: photoName.optional()
});

export const getByIdSchema = Joi.object({
  id: id.required()
});

export const getAllCatsSchema = Joi.object({
  name: name.optional(),
  race: race.optional(),
  birthStart: birth.optional(),
  birthEnd: birth.optional(),
  highestPrice: price.optional(),
  minimumPrice: price.optional(),
  order: order.optional(),
  page: id.required(),
  limit: id.optional()
});
// joi
import Joi from "joi";

export const schoolSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  address: Joi.string().min(3).max(256),
  latitude: Joi.number().min(1).default(null),
  longitude: Joi.number().min(1).default(null),
  phone: Joi.array().items(Joi.number().min(100000000).max(999999999)),
  brandId: Joi.number().integer().min(1).required()
});

export const schoolGetByIdSchema = Joi.object({
  id: Joi.number().required()
})

export const schoolUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  address: Joi.string().min(3).max(256),
  latitude: Joi.number().min(1),
  longitude: Joi.number().min(1),
  phone: Joi.array().items(Joi.number().min(100000000).max(999999999)),
  brandId: Joi.number().integer().min(1).required(),
})
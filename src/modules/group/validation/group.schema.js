import Joi from "joi";

export const createGroupSchema = Joi.object({
  name: Joi.string().max(64).min(4).required(),
  brandId: Joi.number().integer().min(1).required(),
  headTeacherId: Joi.number().integer().min(1).required(),
  brandId: Joi.number().integer().min(1).required()
});

export const groupGetByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const updategroupSchema = Joi.object({
  name: Joi.string().max(64).min(4).required(),
  brandId: Joi.number().integer().min(1).required(),
  headTeacherId: Joi.number().integer().min(1).required(),
  brandId: Joi.number().integer().min(1).required(),
});

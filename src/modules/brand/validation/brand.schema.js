import Joi from "joi";

export const createBrandSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  isPublic: Joi.boolean().default(true),
});

export const brandGetByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const brandUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  isPublic: Joi.boolean(),
});

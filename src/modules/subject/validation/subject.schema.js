import Joi from "joi";

export const createSubjectSchema = Joi.object({
  name: Joi.string().max(32).min(4).required(),
  brandId: Joi.number().integer().min(1).required()
});

export const subjectGetByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const updateSubjectSchema = Joi.object({
  name: Joi.string().max(32).min(4).required(),
  brandId: Joi.number().integer().min(1).required()
});

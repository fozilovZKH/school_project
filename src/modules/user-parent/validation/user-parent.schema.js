import Joi from "joi";

export const createSchema = Joi.object({
  childId: Joi.number().integer().min(1).required(),
  parentId: Joi.number().integer().min(1).required()
});

export const GetByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const updateSchema = Joi.object({
  childId: Joi.number().integer().min(1).required(),
  parentId: Joi.number().integer().min(1).required()
});

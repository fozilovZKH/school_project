import Joi from "joi";

export const createRoomSchema = Joi.object({
  number: Joi.number().integer().min(1).default(null),
  name: Joi.string().max(32).min(4),
  floor: Joi.number().integer().min(1).default(null),
  capacity: Joi.number().integer().min(1).default(null),
  schoolId: Joi.number().integer().min(1).required()
});

export const roomGetByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const updateRoomSchema = Joi.object({
  number: Joi.number().integer().min(1).default(null),
  name: Joi.string().max(32).min(4),
  floor: Joi.number().integer().min(1).default(null),
  capacity: Joi.number().integer().min(1).default(null),
  schoolId: Joi.number().integer().min(1).required()
});

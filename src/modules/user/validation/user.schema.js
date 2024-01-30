import Joi from "joi";
import { roles, sex } from "../../../common/enums/roles.js";

const rolesArray = Object.values(roles);
const sexArray = Object.values(sex);

export const userRegisterSchema = Joi.object({
  login: Joi.string().max(32).min(4).required(),
  password: Joi.string().max(32).min(4).required(),
  role: Joi.string().valid(...rolesArray).required(),
  sex: Joi.string().valid(...sexArray).required(),
  firstName: Joi.string().max(32).min(4).required(),
  lastName: Joi.string().max(32).min(4).required(),
  phone: Joi.array().items(Joi.number().min(100000000).max(999999999)).required(),
  brandId: Joi.number().integer().min(1).required(),
  repeatPassword: Joi.ref("password"),
});

export const userLoginSchema = Joi.object({
  login: Joi.string().required().min(3).max(100),
  password: Joi.string().required()
})

export const userGetByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const userUpdateSchema = Joi.object({
  login: Joi.string().max(32).min(4).required(),
  password: Joi.string().max(32).min(4).required(),
  role: Joi.string().valid(...rolesArray).required(),
  sex: Joi.string().valid(...sexArray).required(),
  firstName: Joi.string().max(32).min(4).required(),
  lastName: Joi.string().max(32).min(4).required(),
  phone: Joi.array().items(Joi.number().min(100000000).max(999999999)).required(),
  address: Joi.string().min(3).max(256),
  latitude: Joi.number().min(1).default(null),
  longitude: Joi.number().min(1).default(null),
  groupId: Joi.number().integer().min(1).required(),
  brandId: Joi.number().integer().min(1).required(),
  repeatPassword: Joi.ref("password"),
})
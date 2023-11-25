import Joi from "joi";

export const registerUserSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});

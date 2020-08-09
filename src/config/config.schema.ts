import * as Joi from '@hapi/joi';

export const configSchema = Joi.object().keys({
  server: Joi.object({
    port: Joi.number().integer().min(1024).max(65535).required(),
    baseUrl: Joi.string().required()
  }),
  token: Joi.object({
    secret: Joi.string().required(),
    expiresIn: Joi.string().required()
  }),
  dataBase: Joi.object({
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().integer(),
    user: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

import * as Joi from '@hapi/joi';

export const operationSchema = Joi.object({
  type: Joi.string().valid('buy', 'salary', 'family', 'other').required(),
  categoryId: Joi.number().required(),
  sum: Joi.number().min(1).required(),
  currency: Joi.string().valid('UAH', 'EUR', 'USD')
})

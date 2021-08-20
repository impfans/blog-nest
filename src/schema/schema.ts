import * as Joi from '@hapi/joi';

export const createUserSchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number().required(),
});

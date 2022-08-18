const joi = require('joi');

const schemaSale = joi.array().items(
  joi.object().keys({
    productId: joi.number().required().messages({
      'any.required': '400|"productId" is required',
    }),
    quantity: joi.number().min(1).required().messages({
      'number.min': '422|"quantity" must be greater than or equal to 1',
      'any.required': '400|"quantity" is required',
    }),
  }),
);

const schemaProduct = joi.object({
  id: joi.string().required().messages({
    'any.required': '400|"id" is required',
  }),
  name: joi.string().min(5).required().messages({
    'string.min': '422|"name" length must be at least 5 characters long',
    'any.required': '400|"name" is required',
  }),
});

module.exports = { schemaSale, schemaProduct };

const { Joi } = require("express-validation");

export const validateCreateAccount = {
  body: Joi.object({
    balance: Joi.number().greater(0).required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    idNumber: Joi.string().required(),
    idName: Joi.string().required(),
    type: Joi.string().required(),
    mobile: Joi.number().required(),
  }),
};

export const validateFetchAccount = {
  params: Joi.object({
    id: Joi.number().greater(0).required(),
  }),
};

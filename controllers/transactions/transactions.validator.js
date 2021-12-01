const { Joi } = require("express-validation");

export const validateCreateTransaction = {
  body: Joi.object({
    amount: Joi.number().not(0).required(),
    description: Joi.string(),
    accountId: Joi.number().greater(0).required(),
  }),
};

export const validateFetchTransactions = {
  query: Joi.object({
    skip: Joi.number().greater(-1),
    limit: Joi.number().greater(0),
  }),
  params: Joi.object({
    accountId: Joi.number().greater(0).required(),
  }),
};

const Joi = require("@hapi/joi");

const schema = Joi.object({
  status: Joi.string().min(2).max(12).required(),
});

export default schema;

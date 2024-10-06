const Joi = require("@hapi/joi");

const schema = Joi.object({
  priority: Joi.string().min(2).max(10).required(),
});

export default schema;
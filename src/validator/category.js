const Joi = require("@hapi/joi");

const schema = Joi.object({
  categoryName: Joi.string().min(3).max(60).required(),
});

export default schema;
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = Joi.object({
  task: Joi.string().min(2).max(1000).required(),
  userName: Joi.objectId(),
  dueDate: Joi.number().required(),
  category: Joi.objectId(),
  priority: Joi.objectId(),
  status: Joi.objectId(),
});

export default schema;

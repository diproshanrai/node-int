const Joi = require("joi");

const itemSchema = Joi.object({
  name: Joi.string().required(),
  companyName: Joi.string().optional().default("Yoddhalab"),
  Designation: Joi.string().required(),
});

const itemsArray = Joi.array().items(itemSchema);

module.exports = { itemSchema, itemsArray };

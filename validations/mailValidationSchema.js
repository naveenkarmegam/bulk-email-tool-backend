const Joi = require('joi');

const sendBulkMailSchema = Joi.object({
  recipients: Joi.array()
    .items(Joi.string().email().required())
    .required()
    .messages({
      "string.email": "Invalid email address in recipients",
      "array.required": "Recipients cannot be empty",
    }),
  subject: Joi.string()
    .required()
    .messages({
      "string.empty": "Subject cannot be empty",
    }),
  content: Joi.string()
    .required()
    .messages({
      "string.empty": "Body of the mail cannot be empty",
    }),
});

module.exports = { sendBulkMailSchema };

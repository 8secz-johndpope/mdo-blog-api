const { CreateErrorResult } = require('../helpers/api.response');

function GenerateErrorsArray(errorsObj) {
  const errors = [];
  errorsObj.forEach((element) => {
    errors.push({
      message: element.message,
      input: element.context.label,
    });
  });

  return { validationErrors: errors };
}

// eslint-disable-next-line consistent-return
module.exports = (schema) => (req, res, next) => {
  const { body } = req;

  const validateStatus = schema.validate(body, { abortEarly: false });
  if (validateStatus.error) {
    const errors = GenerateErrorsArray(validateStatus.error.details);
    const result = CreateErrorResult(400, errors);
    return res.status(result.status).json(result);
  }

  next();
};

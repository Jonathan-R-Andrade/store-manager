const CustomError = require('../errors/CustomError');

const validateSchema = (schema, data, status = 400) => {
  const { error } = schema.validate(data);
  if (error) throw new CustomError(status, error.message);
};

module.exports = validateSchema;

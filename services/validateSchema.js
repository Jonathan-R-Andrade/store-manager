const CustomError = require('../errors/CustomError');

const validateSchema = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) throw new CustomError(400, error.message);
};

module.exports = validateSchema;

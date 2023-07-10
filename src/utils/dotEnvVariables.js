const dotenv = require('dotenv');

const dotEnvVariables = () => {
  const nodeEnvValues = ['production', 'development', 'test'];
  const dotEnvPath = {
    production: './.env',
    development: './.env.dev',
    test: './.env.test',
  };

  if (!nodeEnvValues.includes(process.env.NODE_ENV)) {
    throw new Error(`Unrecognized Environment, check your NODE_ENV variable.
    The value of NODE_ENV must be "production", "development" or "test" and the file .env,
    .env.dev or .env.test must exist in the root directory.`);
  }

  const dotenvOutput = dotenv.config({ path: dotEnvPath[process.env.NODE_ENV] });

  if (dotenvOutput.error) throw dotenvOutput.error;

  return dotenvOutput;
};

module.exports = { load: dotEnvVariables };

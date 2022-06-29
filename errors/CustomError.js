class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'customError';
    this.status = status;
  }
}

module.exports = CustomError;

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
  }
}

module.exports = CustomError;

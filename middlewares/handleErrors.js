const handleErrors = (err, _req, res, _next) => {
  const { name, status, message } = err;
  if (name === 'CustomError') return res.status(status).json({ message });
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = handleErrors;

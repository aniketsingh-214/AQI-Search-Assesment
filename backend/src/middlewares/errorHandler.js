function errorHandler(err, req, res, next) {
  console.error(err);

  const status =
    err.statusCode ||
    (err.name === 'ValidationError' ? 400 : 500);

  res.status(status).json({
    error: err.message || 'Internal server error'
  });
}

module.exports = { errorHandler };

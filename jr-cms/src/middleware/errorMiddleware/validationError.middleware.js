module.exports = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.formatResponse(error.message, 400);
  }
  next(error);
};

const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Enterd.`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.code === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid Try again.`;
    err = new ErrorHandler(message, 400);
  }

  // Jwt Expire  Error
  if (err.code === "TokenExpiredError") {
    const message = `Json Web Token is Expired Try again.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //mongdb wrong id error ie if entered wrong id in get product or update etc then this is called cast error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate user register error || duplicate key error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue) } Entered`
    err = new ErrorHandler(message, 400);
  }

  //Wrong JSON Web Token Error 

  if(err.name === 'jsonWebTokenError'){
    const message = `JSON Web Token is invalid, Try again`
    err = new ErrorHandler(message, 400);
  }
// JWT expire error
  if(err.name === 'TokenExpiredError'){
    const message = `JSON Web Token is Expired, Try again`
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};

const AppError = require("../utils/appError");

// ! Error handler functions
const handleCastErrorDB = (err) => {
  // handle invalid input
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsErrorDB = (err) => {
  const [fieldInfo] = Object.entries(err.keyValue);

  const [field, value] = fieldInfo;

  const message = `This ${field} '${value}' already used by someone else. Please use another ${field}.`;
  return new AppError(message, 400);
};

// ! Send responses

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: `${err.message}`,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational, trusted error: send message to client
  if (err.isOperational) {
    // console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      message: `${err.message}`,
    });
  } else {
    // 1) log error
    console.error("ERROR 🔥", err);

    // 2) programming or other unknown error: don't leak error details
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

// 4 tane parametresi olduğu için nodejs onun error handler olduğunu bilecektir.
module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // hard copy of err argument
    let error = { ...err, message: err.message };

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsErrorDB(error);

    sendErrorProd(error, res);
  }
};

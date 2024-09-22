// middleware/responseMiddleware.js

const logger = require("../config/logger");

module.exports = (req, res, next) => {
  res.success = (data, message = "Operation successful", status = 200) => {
    logger.info({
      method: req.method,
      path: req.path,
      status,
      message,
      data,
    });
    return res.status(status).json({
      success: true,
      status,
      message,
      data,
    });
  };

  res.error = (error, message = "An error occurred", status = 500) => {
    logger.error({
      method: req.method,
      path: req.path,
      status,
      message,
      error: error ? error.toString() : undefined,
    });
    return res.status(status).json({
      success: false,
      status,
      message,
      error: error ? error.toString() : undefined,
    });
  };

  next();
};

const rescue = require('express-rescue');
const HTTP = require('../utils/statusCodeHandler');

module.exports = async (request, response, next) => {
  const { task, status } = request.body;
  const emptyTask = 0;

  if (!task || !status) {
    return response
      .status(HTTP.BAD_REQUEST.code)
      .json({ message: HTTP.BAD_REQUEST.message });
  }

  if (task.length === emptyTask || status.length === emptyTask) {
    return response
      .status(HTTP.BAD_REQUEST.code)
      .json({ message: HTTP.BAD_REQUEST.message });
  }

  next();
};
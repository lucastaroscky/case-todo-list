const { Router } = require('express');
const rescue = require('express-rescue');
const { validateCreateTask } = require('../service')
const createTaskValidator = require('../middleware/createTask');

const HTTP = require('../utils/statusCodeHandler');

const taskManager = Router();

taskManager.post('/', createTaskValidator, rescue(async (request, response) => {
  const { task, status } = request.body;
  const result = await validateCreateTask(task, status);

  response.status(HTTP.CREATED).json(result);
}));


module.exports = { taskManager };
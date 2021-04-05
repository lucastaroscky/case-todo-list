const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../service')
const validateFields = require('../middleware/validateFields');

const { CONFLICT, CREATED, NOT_FOUND } = require('../utils/statusCodeHandler');
const { deleteTask, findById } = require('../model/db');

const taskManager = Router();

taskManager.post('/', validateFields, rescue(async (request, response) => {
  const { task, status } = request.body;
  const createdTask = await service.validateCreateTask(task, status);

  if (!createdTask) return response.status(CONFLICT.code).json({ message: CONFLICT.message })

  response.status(CREATED).json(createdTask);
}));

taskManager.put('/:id', validateFields, rescue(async (request, response) => {
  const { id } = request.params;
  const { task, status } = request.body;
  const updatedTask = await service.validateUpdateTask(id, task, status);

  if (!updatedTask) return response.status(NOT_FOUND.code).json({ message: NOT_FOUND.message });

  response.status(200).json(updatedTask);
}));

taskManager.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const getTaskById = await findById(id)

  if (!getTaskById) return response.status(NOT_FOUND.code).json({ message: NOT_FOUND.message })

  response.status(200).json(getTaskById);
}));

taskManager.get('/', rescue(async (_, response) => {
  const getAll = await service.getTasks();
  response.status(200).json({ tasks: getAll });
}));

taskManager.delete('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const deletedTask = await deleteTask(id);

  if (!deletedTask) return response.status(NOT_FOUND.code).json({ message: NOT_FOUND.message });

  return response.status(204).json({});
}));

module.exports = { taskManager };
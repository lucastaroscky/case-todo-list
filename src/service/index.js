const { createTask, findByTask } = require('../model/db');

const validateCreateTask = async (task, status) => {
  const isTaskAlreadyExists = await findByTask(task);
  const created = createTask(task, status);

  if (isTaskAlreadyExists) return null;

  return await result;
};

module.exports = {
  validateCreateTask,
};

const { createTask, findByTask, updateTask, getAllTasks } = require('../model/db');

const validateCreateTask = async (task, status) => {
  const isTaskAlreadyExists = await findByTask(task);
  const created = createTask(task, status);

  if (isTaskAlreadyExists) return null;

  return await created;
};

const validateUpdateTask = async (id, task, status) => {
  const updated = await updateTask(id, task, status);
  return updated;
};

const getTasks = async () => {
  let result = await getAllTasks();

  for (let i = 0; i < result.length; i += 1) {
    result[i]["id"] = result[i]["_id"];
    delete result[i]["_id"];
  }

  return result;
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  getTasks,
};

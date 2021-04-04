const { getCollection } = require('./connection');

const db = getCollection('tasks');

const createTask = async (task, status) => {
  const collection = await db;
  const result = await collection.insertOne({ task, status });

  return { id: result.insertedId, task, status }
};

const findByTask = async (task) => {
  const collection = await db;
  const result = await collection.findOne({ task });
  return JSON.parse(result);
};

module.exports = {
  createTask,
  findByTask,
};

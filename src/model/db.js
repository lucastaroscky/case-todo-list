const { ObjectId } = require('bson');
const { getCollection } = require('./connection');

const db = getCollection('tasks');

const createTask = async (task, status) => {
  const collection = await db;
  const result = await collection.insertOne({ task, status });

  return { id: result.insertedId, task, status }
};

const updateTask = async (id, task, status) => {
  if (!ObjectId.isValid(id)) return null;

  const collection = await db;
  await collection.updateOne({ _id: ObjectId(id) }, { $set: { task, status } });

  return { id, task, status }
};

const findByTask = async (task) => {
  const collection = await db;
  const result = await collection.findOne({ task });
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const collection = await db;
  const result = await collection.findOne(ObjectId(id));

  return result;
};

const getAllTasks = async () => {
  const collection = await db;
  const result = await collection.find({});
  return result.toArray();
};

const deleteTask = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const collection = await db;
  return await collection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createTask,
  updateTask,
  findByTask,
  findById,
  getAllTasks,
  deleteTask,
};

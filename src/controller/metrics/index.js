const { getCollection } = require('../../model/connection');

const metrics = async (request, response) => {
  const metrics = await getCollection('case_todo_list');
  const result = await metrics.stats();

  response.status(200).json(result);
};

module.exports = { metrics };

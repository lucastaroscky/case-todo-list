const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb+srv://strsk:eGrsz2N6qvhPSV5P@cluster0.m9kzj.mongodb.net/test?authSource=admin&replicaSet=atlas-kq29l2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const url = 'http://localhost:3000';

const notFound = 'Task not found.';

let connection;
let todo_list;
let id;

beforeAll(async () => {
  connection = await MongoClient.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  todo_list = connection.db('todoList').collection('tasks');

});

beforeEach(async () => {
  await todo_list.deleteMany({})
});

afterAll(async () => {
  await connection.close();
});

describe('It is possible to delete a task', () => {

  it('You cannot delete a task that does not exists', async () => {
    await frisby
      .delete(`${url}/todo/123456`)
      .expect('status', 404)
      .then((response) => expect(response.json.message).toBe(notFound));
  });

  it('You can delete a task successfully', async () => {
    await frisby
      .post(`${url}/todo`, { task: 'fix that bug on my code', status: 'pendent' })
      .expect('status', 201)
      .then((response) => id = response.json.id);

    await frisby
      .delete(`${url}/todo/${id}`)
      .expect('status', 204)
  });
});

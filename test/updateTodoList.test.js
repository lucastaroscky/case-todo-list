const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb+srv://strsk:eGrsz2N6qvhPSV5P@cluster0.m9kzj.mongodb.net/test?authSource=admin&replicaSet=atlas-kq29l2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const url = 'http://localhost:3000';

const invalidEntries = 'All fields must be filled.'
const notFound = 'Task not found.';

const list = [{ task: 'clean the kitchen', status: 'pendent' }];

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
  await todo_list.deleteMany({});
});

afterAll(async () => {
  await connection.close();
});

describe('It is possible to update a task and it status', () => {

  it('You cannot update a task that does not exists', async () => {
    await frisby
      .put(`${url}/todo/123456`, list[0])
      .expect('status', 404)
      .then((response) => expect(response.json.message).toBe(notFound));
  });

  it('You cannot update a task without the "tasks" field', async () => {
    await frisby
      .post(`${url}/todo`, list[0])
      .expect('status', 201)
      .then((response => id = response.body.id));

    await frisby
      .put(`${url}/todo/${id}`, { status: 'pendent' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You cannot update a task without the "status" field', async () => {
    await frisby
      .post(`${url}/todo`, list[0])
      .expect('status', 201)
      .then((response => id = response.body.id));

    await frisby
      .put(`${url}/todo/${id}`, { task: 'clean the kitchen' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You cannot update a task with the "tasks" field empty', async () => {
    await frisby
      .post(`${url}/todo`, list[0])
      .expect('status', 201)
      .then((response => id = response.body.id));

    await frisby
      .put(`${url}/todo/${id}`, { task: '', status: 'pendent' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You cannot update a task with the "status" field empty', async () => {
    await frisby
      .post(`${url}/todo`, list[0])
      .expect('status', 201)
      .then((response => id = response.body.id));

    await frisby
      .put(`${url}/todo/${id}`, { task: 'clean the kitchen', status: '' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You can update a task successfully', async () => {
    await frisby
      .post(`${url}/todo`, list[0])
      .expect('status', 201)
      .then((response => id = response.json.id));

    await frisby
      .put(`${url}/todo/${id}`, { task: 'clean the kitchen', status: 'completed' })
      .expect('status', 200)
      .then((response) => {
        const { id: taskId, task, status } = response.json;
        expect(taskId).toEqual(id);
        expect(task).toEqual('clean the kitchen');
        expect(status).toEqual('completed');
      })
  })
});

const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb+srv://strsk:eGrsz2N6qvhPSV5P@cluster0.m9kzj.mongodb.net/test?authSource=admin&replicaSet=atlas-kq29l2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const url = 'http://localhost:3000';

const list = [
  { task: 'clean the kitchen', status: 'pendent' },
  { task: 'read a book', status: 'pendent' },
  { task: 'go to gym', status: 'pendent' },
];

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
  await todo_list.insertMany(list);
});

afterAll(async () => {
  await connection.close();
});

describe('It is possible to list all tasks', () => {
  it('It is possible to list all tasks', async () => {
    await frisby
      .get(`${url}/todo`)
      .expect('status', 200)
      .then((response) => {
        const { tasks } = response.json;
        id = tasks[0].id;

        expect(tasks[0].task).toEqual(list[0].task);
        expect(tasks[0].status).toEqual(list[0].status);
        expect(tasks[1].task).toEqual(list[1].task);
        expect(tasks[1].status).toEqual(list[1].status);
        expect(tasks[2].task).toEqual(list[2].task);
        expect(tasks[2].status).toEqual(list[2].status);
      })
  });

  it('It is possible to list an specific task', async () => {
    await frisby
      .get(`${url}/todo/${id}`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;

        expect(json.task).toEqual(list[0].task);
        expect(json.status).toEqual(list[0].status);
      });
  });
});

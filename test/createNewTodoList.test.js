const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb+srv://strsk:eGrsz2N6qvhPSV5P@cluster0.m9kzj.mongodb.net/test?authSource=admin&replicaSet=atlas-kq29l2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const url = 'http://localhost:3000';

const taskList = [
  { task: 'read a book', status: 'pendent' },
  { task: 'go to gym', status: 'pendent' },
  { task: 'clean my room', status: 'pendent' },
];

const invalidEntries = 'All fields must be filled.'
const conflict = 'Task already exists.'

let connection;
let todo_list;

beforeAll(async () => {
  connection = await MongoClient.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  todo_list = connection.db('todoList').collection('tasks');
});

beforeEach(async () => {
  await todo_list.deleteMany({});
  await todo_list.insertMany(taskList);
});

afterAll(async () => {
  await connection.close();
});

describe('It is possible to create a new todo list', () => {
  it('You cannot create a new to do list without the "tasks" field', async () => {
    await frisby
      .post(`${url}/todo`, { status: 'pendent' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You cannot create a new to do list without the "status" field', async () => {
    await frisby
      .post(`${url}/todo`, { task: 'read a book' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You cannot create a new to do list with the "task" field empty', async () => {
    await frisby
      .post(`${url}/todo`, { task: '', status: 'pendent' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You cannot create a new to do list with the "status" field empty', async () => {
    await frisby
      .post(`${url}/todo`, { task: 'read a book', status: '' })
      .expect('status', 400)
      .then((response) => expect(response.json.message).toBe(invalidEntries))
  });

  it('You cannot create a new task that already exists', async () => {
    await frisby
      .post(`${url}/todo`, { task: 'read a book', status: 'pendent' })
      .expect('status', 409)
      .then((response) => expect(response.json.message).toBe(conflict))
  });
  
  // it('You can create a new to do list with more than 1 task', async () => {
  //   await frisby
  //     .post(`${url}/todo`, taskList)
  //     .expect('status', 201)
  //     .then((response) => {
  //       let body = response.body;
  //       body = [JSON.parse(body)]

  //       const firstTask = body[0].task;
  //       const firstStatus = body[0].status;
  //       const secondTask = body[1].task;
  //       const secondStatus = body[1].status;
  //       const thirdTask = body[2].task;
  //       const thirdStatus = body[2].status;

  //       expect(firstTask).toEqual(taskList[0].task)
  //       expect(firstStatus).toEqual(taskList[0].status)
  //       expect(secondTask).toEqual(taskList[1].task)
  //       expect(secondStatus).toEqual(taskList[1].status)
  //       expect(thirdTask).toEqual(taskList[2].task)
  //       expect(thirdStatus).toEqual(taskList[2].status)
  //     })
  // });

});

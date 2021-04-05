# API - todo-list

Basic API todo-list to save and read tasks.
Created with nodejs + express and mongoDB.

## Installation

- ### Clone the repository

```bash
git clone https://github.com/lucastaroscky/case-todo-list.git
```

- ### Install the dependencies

```bash
npm install
```

> ##### if you don't have `npm` installed, follow this [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

- ### Start the server

```bash
npm run dev
```

## Usage

- ### To create a new task

```bash
curl http://localhost:3000/todo -d '{"task":"read a book", "status":"pendent"}' -H "Content-Type: application/json" -X POST | json_pp
```

- ### Update a task

  > ##### you shoud copy the id of your created task to include it to the id params request to udpate.

```bash
curl http://localhost:3000/todo/id -d '{"task": "read a book", "status":"pendent"}' -H "Content-Type: application/json" -X PUT | json_pp
```

- ### List all taks

```bash
curl http://localhost:3000/todo/ -X GET | json_pp
```

- ### List a specific task

   > #####  you shoud copy the id of the task that you want to see the detais and include it on the id params request.

```bash
curl http://localhost:3000/todo/id -X GET | json_pp
```

- ### Delete a task

    > #####  you shoud copy the id of the task that you want to delete and include it on the id params request.

```bash
curl http://localhost:3000/todo/id -X DELETE
```
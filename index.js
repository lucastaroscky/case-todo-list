const express = require('express');
const { taskManager } = require('./src/controller')

const app = express();
app.use(express.json());

app.use('/todo', taskManager);

app.get('/ping', (req, res) => res.send('pong'));

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
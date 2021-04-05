const express = require('express');

const { taskManager } = require('./src/controller');
const { healthCheck } = require('./src/controller/healthCheck/');
const { metrics } = require('./src/controller/metrics')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/todo', taskManager);
app.use('/healthcheck', healthCheck);
app.use('/metrics', metrics);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

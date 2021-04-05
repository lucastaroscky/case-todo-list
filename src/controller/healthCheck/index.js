const { Router } = require('express');
const rescue = require('express-rescue');
const fs = require('fs');

const healthCheck = Router();

const memory = process.memoryUsage();
const uptime = process.uptime();
const cpu = process.cpuUsage();
const resources = process.resourceUsage();

healthCheck.get('/', rescue(async (request, response) => {
  response.status(200).json({
    check: {
      healthCheck: 'OK!',
      memory,
      uptime,
      cpu,
      resources,
    }
  });
}));

module.exports = { healthCheck };

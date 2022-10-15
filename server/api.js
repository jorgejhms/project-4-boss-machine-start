const express = require('express');
const app = require('../server');
const apiRouter = express.Router();

// Routers
const minionsRouter = require('./minions');

app.use('/api/minions', minionsRouter);

module.exports = apiRouter;

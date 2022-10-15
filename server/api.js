const express = require('express');
const app = require('../server');
const apiRouter = express.Router();

// Routers
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');

app.use('/api/minions', minionsRouter);
app.use('/api/ideas', ideasRouter);

module.exports = apiRouter;

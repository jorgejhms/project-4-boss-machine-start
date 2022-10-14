const express = require('express');
const minionsRouter = express.Router();

let minions = [
    'minion1',
    'minion2',
    'minion3'
]

// Get an array of minions
minionsRouter.get('/', (req, res) => {
    res.send(minions);
})

module.exports = minionsRouter;
const express = require('express');
const minionsRouter = express.Router();

// Test array
let minions = [
    { 'id': 01, name: 'minion1' },
    { 'id': 02, name: 'minion2' },
    { 'id': 03, name: 'minion3' },
]

// Get an array of minions
minionsRouter.get('/', (req, res) => {
    res.send(minions);
})

// Get a single minion
minionsRouter.get('/:id', (req, res) => {
    const minionId = req.params.id;
    console.log(minionId);
    const minionFound = minions.find(minion => minion.id === minionId);
    console.log(minionFound);
    res.send(minionFound);
})

module.exports = minionsRouter;
const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

// Import from database
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('id', (req, res, next, id) => {
    const foundMinion = getFromDatabaseById('minions', id);
    if (!foundMinion) {
        res.status(404).send(`Minion with id ${id} not found`);
    }

    req.minion = foundMinion;
    next();
})

// Get an array of minions
minionsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('minions'));
})

// Create a new minion
minionsRouter.post('/', (req, res) => {

    // Check if body is empty
    if (!Object.keys(req.body).length) {
        return res.status(400).send("Bad request");
    }

    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

// Get a single minion
minionsRouter.get('/:id', (req, res) => {
    res.status(200).send(req.minion);
})

// Update a single minion by id
minionsRouter.put('/:id', (req, res) => {
    const minionToUpdate = updateInstanceInDatabase('minions', req.body);
    res.send(minionToUpdate);
})

// Delete a minion by id
minionsRouter.delete('/:id', (req, res) => {
    const minionToDelete = deleteFromDatabasebyId('minions', req.params.id);
    if (!minionToDelete) {
        res.status(404).send();
    }

    res.status(204).send()
})


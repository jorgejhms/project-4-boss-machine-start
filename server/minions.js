const express = require('express');
const minionsRouter = express.Router();

// Test array
let minions = [
    { 'id': 01, "name": 'minion1', 'age': 15 },
    { 'id': 02, "name": 'minion2', 'age': 66 },
    { 'id': 03, "name": 'minion3', 'age': 999 },
]

// Functions
const createMinion = (queryArguments) => {
    if (queryArguments.hasOwnProperty('id') &&
        queryArguments.hasOwnProperty('name') &&
        queryArguments.hasOwnProperty('age')) {
        return {
            'id': Number(queryArguments.id),
            'name': queryArguments.name,
            'age': Number(queryArguments.age)
        }
    } else {
        return false;
    }
}

// Get an array of minions
minionsRouter.get('/', (req, res) => {
    res.send(minions);
})

// Create a new minion
minionsRouter.post('/', (req, res) => {

    // Check if minion already exists
    const minionExists = minions.find(minion => req.query.id == minion.id);

    if (minionExists) {
        return res.status(400).send(`Minion already exists`);
    }

    // Create a new minion

    const newMinion = createMinion(req.query);

    if (newMinion) {
        minions.push(newMinion);
        res.status(201).send(newMinion);
    } else {
        res.status(400).send("Bad request");
    }

})

// Get a single minion
minionsRouter.get('/:id', (req, res) => {
    const minionId = req.params.id;
    console.log(`Minion Nº: ${minionId}`);

    // Obtiene un minion de la lista
    const minionFound = minions.find(minion => minion.id == minionId);

    if (!minionFound) {
        res.send(`There is no minion with ID ${minionId}`);
    } else {
        res.send(minionFound);
    }
})

module.exports = minionsRouter;
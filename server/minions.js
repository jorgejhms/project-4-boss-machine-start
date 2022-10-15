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

const findMinion = (id, arr) => {
    console.log(arr);
    const foundMinion = arr.find(minion => id == minion.id);
    console.log(foundMinion);
    return foundMinion ? foundMinion : false;
}

// Get an array of minions
minionsRouter.get('/', (req, res) => {
    res.send(minions);
})

// Create a new minion
minionsRouter.post('/', (req, res) => {

    // Check if minion already exists
    // const minionExists = minions.find(minion => req.query.id == minion.id);
    const minionExists = findMinion(req.query, minions);

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

    const minionFound = findMinion(req.params.id, minions);

    return minionFound ?
        res.send(minionFound) :
        res.send(`There is no minion with ID ${minionId}`);

})

// Update a single minion by id
minionsRouter.put('/:id', (req, res) => {
    const minionId = req.query.id;
    const minionFound = minions.find(minions => minions.id == minionId);

    console.log(minionFound);

    if (!minionFound) {

        res.status(404).send(`There is no minion with ID ${minionId}`);
    }

    const newMinion = {
        'id': Number(req.query.id),
        'name': req.query.name,
        'age': Number(req.query.age)
    }

    minions[minionId] = newMinion;

    res.status(200).send(minions[minionId]);



})

// Delete aa minion by id

module.exports = minionsRouter;
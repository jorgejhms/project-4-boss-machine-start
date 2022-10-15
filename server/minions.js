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
    const complete = checkCompleteArg(queryArguments);

    if (complete) {
        return {
            'id': Number(queryArguments.id),
            'name': queryArguments.name,
            'age': Number(queryArguments.age)
        }
    }

    return false;
}

const checkCompleteArg = args => {
    if (args.hasOwnProperty('id') &&
        args.hasOwnProperty('name') &&
        args.hasOwnProperty('age')) {
        return true
    }
    return false;
}

const findMinion = (id, arr) => {
    console.log(arr);
    const foundMinion = arr.find(minion => id == minion.id);
    console.log(foundMinion);
    return foundMinion ? foundMinion : false;
}

const getIndexbyId = (id, arr) => {
    return arr.findIndex(item => {
        return item.id === Number(id);
    });
};

// Get an array of minions
minionsRouter.get('/', (req, res) => {
    res.send(minions);
})

// Create a new minion
minionsRouter.post('/', (req, res) => {

    const foundMinion = findMinion(req.body, minions);

    if (foundMinion) {
        return res.status(400).send(`Minion already exists`);
    }

    // Create a new minion
    const newMinion = createMinion(req.body);

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
    const minionId = req.params.id;
    const minionFound = findMinion(minionId, minions);
    const complete = checkCompleteArg(req.body);

    if (!complete) {
        res.status(400).send("Bad Request");
    }

    if (!minionFound) {
        res.status(404).send(`There is no minion with ID ${minionId}`);
    }

    const newMinion = {
        'id': Number(req.body.id),
        'name': req.body.name,
        'age': Number(req.body.age)
    }

    const minionIndex = getIndexbyId(minionId, minions);
    minions[minionIndex] = newMinion;
    res.status(200).send(minions[minionIndex]);
})

// Delete a minion by id
minionsRouter.delete('/:id', (req, res) => {
    const minionFound = findMinion(req.params.id, minions);

    if (!minionFound) {
        res.status(404).send(`There is no minion with Id ${req.params.id}`)
    }

    const minionIndex = getIndexbyId(req.params.id, minions);
    minions.splice(minionIndex, 1);

    res.status(202).send(minions);
})

module.exports = minionsRouter;
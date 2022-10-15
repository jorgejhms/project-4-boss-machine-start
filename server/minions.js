const express = require('express');
const minionsRouter = express.Router();

// Import from database
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

// Test array
// let minions = [
//     { 'id': 01, "name": 'minion1', 'age': 15 },
//     { 'id': 02, "name": 'minion2', 'age': 66 },
//     { 'id': 03, "name": 'minion3', 'age': 999 },
// ]

// Functions
// const createMinion = (queryArguments) => {
//     const complete = checkCompleteArg(queryArguments);

//     if (complete) {
//         return {
//             'id': Number(queryArguments.id),
//             'name': queryArguments.name,
//             'age': Number(queryArguments.age)
//         }
//     }

//     return false;
// }

// const checkCompleteArg = args => {
//     if (args.hasOwnProperty('id') &&
//         args.hasOwnProperty('name') &&
//         args.hasOwnProperty('age')) {
//         return true
//     }
//     return false;
// }

// const findMinion = (id, arr) => {
//     console.log(arr);
//     const foundMinion = arr.find(minion => id == minion.id);
//     console.log(foundMinion);
//     return foundMinion ? foundMinion : false;
// }

// const getIndexbyId = (id, arr) => {
//     return arr.findIndex(item => {
//         return item.id === Number(id);
//     });
// };

// Get an array of minions
minionsRouter.get('/', (req, res) => {
    // res.send(minions);
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
    const foundMinion = getFromDatabaseById('minions', req.params.id);
    if (!foundMinion) {
        res.status(404).send(`Minion with Id ${req.params.id} not found`);
    }
    res.status(200).send(foundMinion);
})

// Update a single minion by id
minionsRouter.put('/:id', (req, res) => {
    const minion = getFromDatabaseById('minions', req.params.id);

    if (!minion) {
        res.status(404).send();
    }

    const minionToUpdate = updateInstanceInDatabase('minions', req.body);
    console.log(minionToUpdate);
    res.send(minionToUpdate);
})

// Delete a minion by id
minionsRouter.delete('/:id', (req, res) => {
    // const minionFound = findMinion(req.params.id, minions);

    // if (!minionFound) {
    //     res.status(404).send(`There is no minion with Id ${req.params.id}`)
    // }

    // const minionIndex = getIndexbyId(req.params.id, minions);
    // minions.splice(minionIndex, 1);

    // res.status(202).send(minions);
    const minionToDelete = deleteFromDatabasebyId('minions', req.params.id);
    if (!minionToDelete) {
        res.status(404).send();
    }

    res.status(204).send()
})

module.exports = minionsRouter;
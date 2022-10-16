const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

module.exports = ideasRouter;

// Import from database
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

// Check id param
ideasRouter.param('id', (req, res, next, id) => {
    const foundIdea = getFromDatabaseById('ideas', id);
    if (!foundIdea) {
        res.status(404).send(`Idea with id ${id} not found`);
    }

    req.idea = foundIdea;
    next();
})

// Get all ideas
ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
});

// Create new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {

    // Check if body is empty
    if (!Object.keys(req.body).length) {
        return res.status(400).send("Bad request");
    }

    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// Get idea by id
ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea)
});

// Update a single idea by id
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res) => {
    const ideaToUpdate = updateInstanceInDatabase('ideas', req.body);
    res.send(ideaToUpdate);
})

// Delete an idea by id
ideasRouter.delete('/:id', (req, res) => {
    const ideaToDelete = deleteFromDatabasebyId('ideas', req.params.id);
    if (!ideaToDelete) {
        res.status(404).send();
    }
    res.status(204).send();
})
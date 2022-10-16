const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

// Import from database
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db');

// Get an array of meetings
meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
})

// Create a new meeting
meetingsRouter.post('/', (req, res) => {

    // Check if body is empty
    if (!Object.keys(req.body).length) {
        return res.status(400).send("Bad request");
    }

    const newMeeting = addToDatabase('meetings', req.body);
    res.status(201).send(newMeeting);
})

// Delete all meetins
meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send()
})

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
    deleteAllFromDatabase,
    createMeeting
} = require('./db');

// Get an array of meetings
meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
})

// Create a new meeting
meetingsRouter.post('/', (req, res) => {

    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
})

// Delete all meetins
meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send()
})

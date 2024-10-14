const express = require('express');
const router = express.Router();
const { createEvent, getUserEvents, updateEvent, deleteEvent } = require('../controllers/eventController');

// Create event
router.post('/create', createEvent);

// Get user events
router.get('/:userId', getUserEvents);

// Update event
router.put('/update/:eventId', updateEvent);

// Delete event
router.delete('/delete/:eventId', deleteEvent);

module.exports = router;

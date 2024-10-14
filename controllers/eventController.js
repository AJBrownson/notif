const Event = require('../models/eventModel');

// Create a new event
exports.createEvent = async (req, res) => {
  const { eventName, eventDesc, eventTime, eventDate, user } = req.body;

  try {
    const newEvent = new Event({
      eventName,
      eventDesc,
      eventTime,
      eventDate,
      user,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all events for a user
exports.getUserEvents = async (req, res) => {
  const userId = req.params.userId;

  try {
    const events = await Event.find({ user: userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const updates = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

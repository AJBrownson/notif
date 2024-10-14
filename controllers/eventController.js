const Event = require('../models/eventModel');

// Create a new event
exports.createEvent = async (req, res) => {
  const { eventName, eventDesc, eventTime, eventDate, user } = req.body;

  // Validate the required fields
  if (!eventName || !eventDesc || !eventTime || !eventDate || !user) {
    return res.status(400).json({ error: 'All fields are required' });
  }

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
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all events for a user
exports.getUserEvents = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const events = await Event.find({ user: userId });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Update an event
exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const updates = req.body;

  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Delete an event
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;

  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  try {
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


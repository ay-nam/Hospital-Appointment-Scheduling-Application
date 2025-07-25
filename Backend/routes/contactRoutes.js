// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessageSchema');

// POST a contact message
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, message } = req.body;

    const newMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      mobile,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save contact message', error: error.message });
  }
});


// GET all contact messages
router.get('/', async (req, res) => {
    try {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
  });
  
module.exports = router;

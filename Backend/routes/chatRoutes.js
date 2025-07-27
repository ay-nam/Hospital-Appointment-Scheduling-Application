const express = require('express');
const router = express.Router();

router.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    const botReply = `You said: ${userMessage}`; // dummy reply
    res.json({ reply: botReply });
});

module.exports = router;

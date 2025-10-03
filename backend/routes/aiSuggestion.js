const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get AI suggestion
router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Use a stable model name
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
        
        // Simple prompt
        const prompt = `You are an accessibility expert. Answer concisely: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const suggestion = response.text();

        res.json({ success: true, suggestion });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ 
            error: 'Failed to get AI response',
            details: error.message 
        });
    }
});

module.exports = router;
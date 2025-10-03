const express = require('express');
const router=express.Router();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Import routes
const analysisRoutes = require('./routes/analysis');
const screenshotRoutes = require('./routes/screenshot');
const aiSuggestionRoutes = require('./routes/aiSuggestion');

// Use routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/screenshot', screenshotRoutes);
app.use('/api/ai-suggestion', aiSuggestionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Accessibility Analyzer API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;

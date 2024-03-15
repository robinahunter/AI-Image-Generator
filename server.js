const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (e.g., compiled React app)
app.use(express.static(path.join(__dirname, 'dist')));

// Define API routes or any other backend logic
app.get('/api/example', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});
// Define API routes for speech generation
app.post('/api/generate-speech', async (req, res) => {
  try {
    // Extract input text from the request body
    const { inputText } = req.body;

    // Call the OpenAI API to generate speech from the input text
    const speechUrl = await generateSpeech(inputText);

    // Return the URL of the generated speech as the response
    res.json({ url: speechUrl });
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});


// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

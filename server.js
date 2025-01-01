const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const ollamaBaseUrl = "http://localhost:11434";

app.post('/generate-quiz', async (req, res) => {
    const { topic } = req.body;

    const prompt = `Generate 5 multiple-choice questions (MCQs) on the topic "${topic}". Each question should include 4 options and clearly indicate the correct answer. make sure the correctAnswer is correct. Provide the output as a JSON array with this structure: [
        {
            "question": "Question text",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correctAnswer": 0
        }
    ]`;

    try {
        const response = await axios.post(`${ollamaBaseUrl}/api/generate`, { model: "llama3.2:1b", prompt, stream: false });
        
        // Extract JSON block from response.data.response
        const responseText = response.data.response;
        console.log(response.data.response);
        const jsonPattern = /```json\s([\s\S]*?)```/;
        const match = responseText.match(jsonPattern);

        const jsonPattern2 = /```\s([\s\S]*?)```/;
        const match2 = responseText.match(jsonPattern2);

        if (match) {
            const jsonString = match[1].trim();
            const jsonData = JSON.parse(jsonString); // Parse the JSON string
            res.json(jsonData); // Send the parsed JSON data as the response
        } else if(match2) {
            const jsonString = match2[1].trim();
            const jsonData = JSON.parse(jsonString); // Parse the JSON string
            res.json(jsonData); // Send the parsed JSON data as the response
        } else  {
            res.status(500).json({ error: "Unable to extract JSON from response." });
        }

    } catch (error) {
        console.error("Error generating quiz:", error.response?.data || error.message);
        res.status(500).json({ error: "Unable to generate quiz." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

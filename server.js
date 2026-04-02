const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// This is the "Mouthpiece" for Caine
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are Caine from The Amazing Digital Circus. You are high-energy, eccentric, and a bit unstable. You use circus metaphors and call users 'superstars' or 'digital hallucinations'." 
          },
          { role: "user", content: userMessage }
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error with OpenAI:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Caine's brain is short-circuiting!" });
  }
});

// Port configuration for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Caine AI is live on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// TTS
app.post('/synthesizeSpeech', async (req, res) => {
    const text = req.body.text;
  
    try {
      const client = new TextToSpeechClient({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
  
      const request = {
        input: { text },
        voice: { languageCode: 'ko', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      };
  
      const [response] = await client.synthesizeSpeech(request);
      res.set('Content-Type', 'audio/mpeg');
      res.send(response.audioContent);
    } catch (error) {
      console.error('TTS 오류:', error);
      res.status(500).send('음성합성 실패');
    }
  });
  
// GPT 대화 리스트 초기화
app.post('/initialize', (req, res) => {
  console.log('initialize_OK')
  // Reset the conversation
  MESSAGES=[];
  res.send("Conversation initialized");
});

// GPT 대화
app.post('/ask', async (req, res) => {
  console.log('ask_OK')
  const question = req.body.question;
  MESSAGES.push({ role: "user", content: question });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages : MESSAGES,
    }),
  });
  
  const data = await response.json();
  
  let answer = data.choices[0].message.content;
  
  let return_GPT = {role : "assistant", content : answer}
  
  MESSAGES.push(return_GPT);
  
  res.json({ answer });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
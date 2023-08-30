const express = require('express');
const cors = require('cors');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
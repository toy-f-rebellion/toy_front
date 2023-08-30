// Text-To-Speech.js
import React, { useState } from 'react';

export const TTS = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const playTTS = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/synthesizeSpeech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const audioContent = await response.arrayBuffer();
      const audioBuffer = new Uint8Array(audioContent);
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audio.oncanplaythrough = () => {
        audio.play();
      };
    } catch (error) {
      console.error('TTS 오류:', error);
    }
  };

  return { text, handleTextChange, playTTS };
};
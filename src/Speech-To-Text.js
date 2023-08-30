import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const STT = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening: SpeechRecognition.stopListening,
    resetTranscript,
    error: !browserSupportsSpeechRecognition
  };
};

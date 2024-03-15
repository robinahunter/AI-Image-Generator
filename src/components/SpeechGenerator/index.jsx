import React, { useState } from 'react';
import './style.css';

const SpeechGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [speechUrl, setSpeechUrl] = useState('');
  // const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const generateSpeech = async (inputText) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/audio/speech", 
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'tts-1-hd',
            input: inputText,
            voice: 'nova'
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  };

  const handleGenerateSpeech = async () => {
    try {
      const url = await generateSpeech(inputText);
      setSpeechUrl(url);
    } catch (error) {
      console.error('Error generating speech:', error);
    }
  };

  return (
    <div>
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={handleGenerateSpeech}>Generate Speech</button>
      {speechUrl && (
        <audio controls autoPlay>
          <source src={speechUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default SpeechGenerator;

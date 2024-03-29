import React, { useState } from 'react';

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  let speech = null;

  const handleSpeak = () => {
    if (!isSpeaking) {
      speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'ar-SA'; // Set the language to Arabic (Saudi Arabia)
      window.speechSynthesis.speak(speech);
      setIsSpeaking(true);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <button onClick={handleSpeak}>
      <span role="img" aria-label="speaker"><img src={require('./imagess/playsound.png')} alt=" playsound" className="playsound" /></span>
    </button>
  );
};

export default TextToSpeech;

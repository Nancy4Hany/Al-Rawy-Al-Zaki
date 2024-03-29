
import React from 'react';
import './styles.css'; 
import TextToSpeech from './TextToSpeech'; // Import the TextToSpeech component

const MessageWindow = ({ messages }) => {
  return (
    <div className="message-area">
      <div className="message-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.content}
            {message.sender === 'bot' && message.image && (
              <div className="response-image">
                <img src={message.image} alt="Response" className="bot-image" />
              </div>
            )}
            {message.sender === 'bot' && (
              <div className="response-voice">
                <TextToSpeech text={message.content} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageWindow;

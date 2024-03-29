import React, { useState } from 'react';
import './styles.css'; // Import your CSS file

const InputArea = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="اكتب رسالتك..."
      />
   
      <button onClick={handleSendMessage}><img src={require('./imagess/explor.png')} alt=" بحث" className="explor img-with-animated-shadow"/></button>
    </div>
  );
};

export default InputArea;

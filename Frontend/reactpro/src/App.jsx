
import React, { useState } from 'react';
import MessageWindow from './Messagewindow';
import InputArea from './InputArea';
import AgeButtons from './Age';
import './styles.css'; 
import axios from 'axios'; 

const App = () => {
  const [messages, setMessages] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');
  const [responseImage, setResponseImage] = useState('');

  const handleSendMessage = async (message) => {
    const userMessage = {
      sender: 'user',
      content: message,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const response = await axios.get(`https://peatapi.azurewebsites.net/api/peat/reader?age=${selectedAge}&title=${message}`);
      const data = response.data;

      const botMessage = {
        sender: 'bot',
        content: data.summary,
        image: data.imageURL,
      };

      setResponseImage(data.imageURL);
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <img src={require('./imagess/logo.png')} alt="شعار الدردشة" className="logo" />
        <h2 className="logo-name">الراوي الذكي</h2>
        <AgeButtons onSelectAge={handleAgeSelection} />
        <img src={require('./imagess/avatar.png')} alt=" avatar" className="avatar" />
      </div>
      <MessageWindow messages={messages} />
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;

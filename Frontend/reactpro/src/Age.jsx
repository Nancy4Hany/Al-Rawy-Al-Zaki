import React, { useState } from 'react';
import './styles.css'; // Import your CSS file

const AgeButtons = ({ onSelectAge }) => {
  const [selectedAge, setSelectedAge] = useState('');

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
    onSelectAge(age);
  };

  return (
    <div className="age-buttons">
      <button 
        onClick={() => handleAgeSelection('1')} 
        className={selectedAge === '1' ? 'selected' : ''}
      >
        <img src={require('./imagess/adnan.png')} alt="adnan " className="child"/> الطفل عدنان
      </button>
      <button 
        onClick={() => handleAgeSelection('2')} 
        className={selectedAge === '2' ? 'selected' : ''}
      >
        <img src={require('./imagess/ali.png')} alt="ali " className="child"/> المراهق علي
      </button>
      <button 
        onClick={() => handleAgeSelection('3')} 
        className={selectedAge === '3' ? 'selected' : ''}
      >
        <img src={require('./imagess/sara.png')} alt="sara " className="child"/> الشابة سارا
      </button>
    </div>
  );
};

export default AgeButtons;

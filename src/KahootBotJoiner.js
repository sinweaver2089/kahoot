import React, { useState } from 'react';
import axios from 'axios';

const KahootBotJoiner = () => {
  const [gameCode, setGameCode] = useState('');
  const [botName, setBotName] = useState('jaqueline');
  const [botCount, setBotCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    if (!gameCode || botCount <= 0) {
      alert('Please enter a valid game code and bot count.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post('/api/join', {
        gameCode,
        botName,
        botCount
      });
      
      if (response.data.success) {
        alert(`Successfully joined ${botCount} bots!`);
      } else {
        alert(`Failed to join bots: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Failed to join bots:`, error.message);
      alert(`Failed to join bots. Check console for details.`);
    }
    setIsLoading(false);
  };

  return (
    <div className="bot-joiner">
      <input 
        placeholder="Kahoot Game Code" 
        value={gameCode} 
        onChange={(e) => setGameCode(e.target.value)} 
      />
      <input 
        placeholder="Base Name (e.g. jaqueline)" 
        value={botName} 
        onChange={(e) => setBotName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Number of Bots" 
        value={botCount} 
        onChange={(e) => setBotCount(Number(e.target.value))} 
      />
      <button onClick={handleJoin} disabled={isLoading}>
        {isLoading ? 'Joining...' : 'Join Game'}
      </button>
    </div>
  );
};

export default KahootBotJoiner;

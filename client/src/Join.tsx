import React, { useState } from 'react';

const Join: React.FC = () => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />

      <br />

      <label htmlFor="roomCode">Room Code:</label>
      <input type="text" id="roomCode" value={roomCode} onChange={handleRoomCodeChange} />
    </div>
  );
};

export default Join;
import React from "react";

const Host: React.FC = () => {
  const [name, setName] = React.useState("");
  const [roomCode, setRoomCode] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
  };

  return (
    <div>
      <h1>Create room</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Room Code:
        <input type="text" value={roomCode} onChange={handleRoomCodeChange} />
      </label>
      <br />
      <button type="submit">Create</button>
    </div>
  );
};

export default Host;

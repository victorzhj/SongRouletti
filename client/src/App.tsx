import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  let ws: WebSocket;

  const joinRoom = () => {   
    let room = roomName
    if (!roomName) {
      room = createRoom()
    }

    ws = new WebSocket("ws://localhost:3000");

    ws.addEventListener("open", (_) => {
      console.log("WebSocket connection opened");

      // send room number to server
      ws.send(JSON.stringify({ room }));
    });
  };

  const killConnection = () => {
    // if(ws.readyState === WebSocket.CLOSED)

    ws.close();
    console.log("Connection closed")
    setMessage("Connection ended");
  };
  
  const checkConnections = () => {
    ws.send("connections")
  }

  const createRoom = (): string => {
    const newRoom = (Math.random() + 1).toString(36).substring(7);
    setRoomName(newRoom);
    return newRoom;
  };


  return (
    <>
      <h1>Hello world</h1>
      <div>
        <button onClick={joinRoom}>Join room</button>
        <button onClick={killConnection}>End connection</button>
        <button onClick={checkConnections}>Check connections</button>
        <div>{message}</div>
      </div>
      <div>
        <button onClick={createRoom}>Create room</button>
        <input onChange={e => setRoomName(e.target.value)}></input>
        <div>{roomName}</div>
      </div>
    </>
  );
}

export default App;

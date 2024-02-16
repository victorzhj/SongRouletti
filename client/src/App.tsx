import { useState } from "react";
import Join from "./Join";
import Host from "./Host";

let ws: WebSocket;

function App() {
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  const [currentRoom, setCurrentRoom] = useState("")
  const [userCount, setUserCount] = useState("")

  if (ws && ws.readyState === WebSocket.OPEN) {
  }

  const joinRoom = () => {
    if (ws && ws.readyState === WebSocket.OPEN) return;

    let room = roomName;
    if (!roomName) {
      room = createRoom();
    }

    ws = new WebSocket("ws://localhost:3000");

    ws.addEventListener("open", (_) => {
      ws.send(JSON.stringify({ room })); // send room number to server
    });

    ws.addEventListener("message", (event) => {
      const { room, userCount } = JSON.parse(event.data) as { room: string; userCount: number };
      setCurrentRoom(room.toString());
      setUserCount(userCount.toString());
    });
    setMessage("Connection opened")
    
    ws.onopen = () => {
      checkConnections()
    }
  };

  const killConnection = () => {
    if (!ws || ws.readyState === WebSocket.CLOSED) return;
    ws.close();
    setCurrentRoom("")
    setUserCount("")
    setMessage("Connection closed")
  };

  const checkConnections = () => {
    if (!ws || (ws && ws.readyState === WebSocket.CLOSED)) return;
    ws.send("connections");
  };

  const createRoom = (): string => {
    const newRoom = (Math.random() + 1).toString(36).substring(7);
    setRoomName(newRoom);
    return newRoom;
  };

  return (
    <>
      {/* <h1>Hello world</h1>
      {currentRoom && <div>Current room {currentRoom} has {userCount} person(s)</div>}
      <div>
        <button onClick={joinRoom}>Join room</button>
        <button onClick={killConnection}>End connection</button>
        <button onClick={checkConnections}>Check connections</button>
        <div>{message}</div>
      </div>
      <div>
        <button onClick={createRoom}>Create room</button>
        <input onChange={(e) => setRoomName(e.target.value)}></input>
        <div>{roomName}</div>
      </div> */}
      <Host />
      {/* <Join /> */}
    </>
  );
}

export default App;

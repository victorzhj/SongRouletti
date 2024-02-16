const BASE_URL = "ws://localhost:3000";

// Connect the player to a room
const connectToRoom = (room: string): WebSocket => {
  const ws = new WebSocket(BASE_URL);

  ws.onopen = () => {
    ws.send(JSON.stringify({ room })); // send room number to server
  };
  return ws;
};


const leaveRoom = (ws: WebSocket) => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    throw new Error("Not in a room");
  }

  ws.close();
};

// const checkConnections = () => {
//   if (!ws || (ws && ws.readyState === WebSocket.CLOSED)) return;
//   ws.send("connections");
// };

// const createRoom = (): string => {
//   const newRoom = (Math.random() + 1).toString(36).substring(7);
//   setRoomName(newRoom);
//   return newRoom;
// };

import { WebSocket } from "ws";

const PORT: number = parseInt(process.env.PORT || "3000");

const wss = new WebSocket.Server({ port: PORT });

interface WebSocketWithRoom extends WebSocket {
  room: string
}

let rooms: { [key: string]: WebSocketWithRoom[] } = {};

wss.on("connection", (ws: WebSocketWithRoom) => {
  console.log("New connection");

  ws.on("message", (message) => {
    if (message.toString() === "connections") {
      const keys = Object.keys(rooms);
      for (const key of keys) {
        console.log(key);
        console.log(rooms[key].length);
      }
      return;
    }

    const { room }: { room: string } = JSON.parse(message.toString());
    console.log(room);

    if (!Object.keys(rooms).includes(room)) {
      console.log("Creating room");
      rooms[room] = [];
    }
    rooms[room].push(ws);
    ws.room = room;
  });

  ws.on("close", () => {
    const room = ws.room;
    rooms[room] = rooms[room].filter(con => con !== ws)
    console.log("Connection ended");
  });
});

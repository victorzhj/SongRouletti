import { WebSocket } from "ws";

const PORT: number = parseInt(process.env.PORT || "3000");

const wss = new WebSocket.Server({ port: PORT });

interface PlayerSocket extends WebSocket {
  name: string
  room: string
  points: number
}

let rooms: { [key: string]: PlayerSocket[] } = {};

wss.on("connection", (ws: PlayerSocket) => {
  console.log("New connection");

  ws.on("message", (message) => {
    if (message.toString() === "connections") {
      const info = {
        room: ws.room,
        userCount: rooms[ws.room].length
      }
      ws.send(JSON.stringify(info))
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

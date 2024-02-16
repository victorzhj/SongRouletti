import { WebSocket } from "ws"

const PORT: number = parseInt(process.env.PORT || "3000");

const wss = new WebSocket.Server({ port: PORT});

let rooms: { [key: string]: WebSocket[] } = {};


wss.on("connection", (ws: WebSocket) => {
  console.log("New connection")
  let room: string;

  ws.on("message", message => {
    if (message.toString() === "connections") {
      const keys = Object.keys(rooms)
      for (const key of keys) {
        console.log(key)
        console.log(rooms[key].length)
      }
      return
    }

    room = JSON.parse(message.toString()).room
    console.log(room)

    if (!Object.keys(rooms).includes(room)) {
      console.log("Creating room")
      rooms[room] = [] 
    }
    rooms[room].push(ws) 
  })

  ws.on("close", () => {
    rooms[room] = rooms[room].filter(so => so !== ws) 
    console.log("Connection ended")
  })
})



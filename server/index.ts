import { WebSocket } from "ws"

const PORT: number = parseInt(process.env.PORT || "3003");

const wss = new WebSocket.Server({ port: PORT});

wss.on("connection", (ws: WebSocket) => {
  console.log("new connection")

  ws.on("message", data => {
    console.log("client data: ", data.toString())
  
    ws.send("Server message")
  })

  ws.on("close", (_ws: WebSocket) => {
    console.log("client disconnected")
  })
})

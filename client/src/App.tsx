const ws = new WebSocket("ws://localhost:3003");

ws.addEventListener("open", (_) => {
  console.log("WebSocket connection opened")
  ws.send("client handshake");
});

ws.addEventListener("message", e => {
  console.log(e.data)
})

function App() {
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;

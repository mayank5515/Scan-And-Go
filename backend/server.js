const socket = require("socket.io");

const app = require("./app");

const server = require("http").createServer(app);

const io = socket(server);
io.on("connection", (socket) => {
  console.log("User connected");

  // PRERESERVED EVENT
  setTimeout(() => {
    socket.send("Welcome to the chat!");
  }, 3000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// socket.js
const socketIo = require("socket.io");

let io; // Define the io variable

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: ["*", "http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected", socket.id);
  });
};

const getSocket = () => {
  if (!io) {
    throw new Error(
      "Socket.io is not initialized. Call initSocket(server) first."
    );
  }
  return io;
};

module.exports = { initSocket, getSocket };

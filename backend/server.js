const socketIo = require("socket.io");
const connectDB = require("./middlewares/dbconn");
const mongoose = require("mongoose");
const { initSocket } = require("./utils/socket"); // Import the init function
const app = require("./app");

// var WebSocketServer = require("websocket").server;

//CONNECT TO DATABASE -> IF FAILS DONOT START SERVER// Initialize Socket.io with the server
connectDB();

const server = require("http").createServer(app);

initSocket(server);
// console.log("IO FROM SERVER", io);
// Log when a client connects

const PORT = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

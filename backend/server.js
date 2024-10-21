const socket = require("socket.io");
const connectDB = require("./middlewares/dbconn");
const mongoose = require("mongoose");
const app = require("./app");
// var WebSocketServer = require("websocket").server;

//CONNECT TO DATABASE -> IF FAILS DONOT START SERVER
connectDB();
const server = require("http").createServer(app);

// const io = socket(server);
// io.on("connection", (socket) => {
//   console.log("User connected");

//   // PRERESERVED EVENT
//   setTimeout(() => {
//     socket.send("Welcome to the chat!");
//   }, 3000);

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

const PORT = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// [{ ID: "3EBC163E", Name: "Coffee", Price: "150" }];

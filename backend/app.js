const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const productRouter = require("./routes/product.route");
const stateRouter = require("./routes/state.route");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
// const whitelist = [
//   "https://google.com",
//   "https:yoursite.com",
//   "http://127.0.0.1:3000",
//   "http://localhost:3500",
//   "http://127.0.0.1:5173",
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,POST,PUT,DELETE,PATCH",
//   optionsSuccessStatus: 200,
//   allowedHeaders: "Content-Type,Authorization",
// };

app.use(cors());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/toggleState", stateRouter);

module.exports = app;

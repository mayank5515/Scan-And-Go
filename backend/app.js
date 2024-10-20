const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRouter = require("./routes/product.route");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRouter);

module.exports = app;

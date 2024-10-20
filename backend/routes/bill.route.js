const express = require("express");
const router = express.Router();

const { createBill } = require("../controllers/bill.controller");

router.post("/create", createBill);

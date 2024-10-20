const express = require("express");
const router = express.Router();

const { createBill, getBill } = require("../controllers/bill.controller");

router.get("/:id", getBill); //will change
//maybe socket io issi route pe call krega baar baar to check if shopping list me kuch update hua hai
router.post("/create", createBill);

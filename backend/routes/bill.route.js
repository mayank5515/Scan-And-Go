const express = require("express");
const authController = require("../controllers/auth.controller");
const billController = require("../controllers/bill.controller");

const router = express.Router();

router.route("/:id").get(billController.getBill); //will change
//maybe socket io issi route pe call krega baar baar to check if shopping list me kuch update hua hai

router
  .route("/createbill")
  .post(authController.protect, billController.createActiveBill);

module.exports = router;

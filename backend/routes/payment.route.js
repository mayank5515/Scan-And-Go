const express = require("express");
const paymentController = require("./../controllers/payment.controller");

const router = express.Router();

router.route("/checkout").post(paymentController.paymentCheckout);

module.exports = router;

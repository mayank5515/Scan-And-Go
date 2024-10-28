const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/user.controller");

const router = express.Router();

router.use(express.json());

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);



module.exports = router;

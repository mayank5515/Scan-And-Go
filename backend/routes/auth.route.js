const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.use(express.json());

router.route("/send-otp").post(authController.sendOtp);
router.route("/verify-otp").post(authController.verifyOtp);
router.route("/check-auth").get(authController.protect, (req, res) => {
  res.status(200).json({ status: "success", message: "Authenticated" });
});

module.exports = router;

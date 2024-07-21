const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

// Send OTP email
router.post("/send-otp-email", otpController.sendOtpEmail);

// Verify OTP
router.post("/verify-otp", otpController.verifyOtp);

module.exports = router;

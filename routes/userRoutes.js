const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Sign-up route
router.post("/sign-up", userController.signUp);

// Sign-in route
router.post("/sign-in", userController.signIn);

// Password reset routes
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// Update user details route
router.put("/update-details", userController.updateDetails);

module.exports = router;

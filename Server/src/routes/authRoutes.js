const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
} = require("../controllers/authController");

const {
  registerValidator,
  loginValidator,
  resetPasswordValidator,
} = require("../validators/authValidator");

const validateRequest = require("../validators/validateRequest");
const { loginLimiter } = require("../services/rateLimiter");

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginLimiter, loginValidator, validateRequest, loginUser);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post(
  "/reset-password",
  resetPasswordValidator,
  validateRequest,
  resetPassword,
);

module.exports = router;

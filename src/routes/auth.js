const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.post("/refreshToken", authController.requestRefreshToken);
router.post("/logout", authController.logOut);

module.exports = router;

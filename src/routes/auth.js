const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");
const { verifyToken } = require("../app/middlewares/VerifyToken");

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.post("/refreshToken", authController.requestRefreshToken);
router.post("/logout", authController.logOut);
router.post("/checkToken", verifyToken, authController.checkTokenIsStillValid);

module.exports = router;

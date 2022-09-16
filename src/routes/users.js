const express = require("express");
const route = express.Router();
const UserController = require("../app/controllers/UsersController");
const { verifyToken } = require("../app/middlewares/VerifyToken");

route.get("/:id", UserController.getUserById);
route.get("/", UserController.getUsers);
route.post("/uploadImage", verifyToken, UserController.postUserAvatar);

module.exports = route;

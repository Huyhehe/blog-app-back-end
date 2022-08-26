const express = require("express");
const route = express.Router();
const UserController = require("../app/controllers/UsersController");

route.get("/:id", UserController.getUserById);
route.get("/", UserController.getUsers);

module.exports = route;

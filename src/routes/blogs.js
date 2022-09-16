const express = require("express");
const router = express.Router();
const blogsController = require("../app/controllers/BlogsController");
const {
  verifyToken,
  verifyAuthorization,
} = require("../app/middlewares/VerifyToken");

router.post("/add", verifyAuthorization, blogsController.add);
router.delete("/delete/:id", verifyToken, blogsController.delete);
router.get("/:id", blogsController.specific);
router.get("/", verifyToken, blogsController.index);

module.exports = router;

const blogsRouter = require("./blogs");
const usersRouter = require("./users");
const authRouter = require("./auth");

const route = (app) => {
  app.use("/api/blogs", blogsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
};

module.exports = route;

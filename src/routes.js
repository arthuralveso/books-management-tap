const Router = require("express");
const bookRouter = require("./controller/BookController");
const sessionRouter = require("./controller/LoginController");
const userRouter = require("./controller/UserController");

const routes = Router();

routes.use("/books", bookRouter);
routes.use("/users", userRouter);
routes.use("/session", sessionRouter);

module.exports = routes;

const Router = require("express");
const Book = require("../model/Book");
const auth = require("../service/authService");

const bookRouter = Router();

bookRouter.get(
  "/",
  auth.isAuthenticated,
  auth.hasRole("user"),
  async (req, res) => {
    res.json(await Book.find());
  }
);

bookRouter.get(
  "/:id",
  auth.isAuthenticated,
  auth.hasRole("user"),
  async (req, res) => {
    res.json(await Book.findById(req.params.id));
  }
);

bookRouter.post(
  "/",
  auth.isAuthenticated,
  auth.hasRole("user"),
  async (req, res) => {
    res.json(await new Book(req.body).save());
  }
);

bookRouter.put(
  "/:id",
  auth.isAuthenticated,
  auth.hasRole("user"),
  async (req, res) => {
    res.json(await Book.findByIdAndUpdate(req.params.id, req.body));
  }
);

bookRouter.delete(
  "/:id",
  auth.isAuthenticated,
  auth.hasRole("user"),
  async (req, res) => {
    res.json(await Book.findByIdAndRemove(req.params.id));
  }
);

module.exports = bookRouter;

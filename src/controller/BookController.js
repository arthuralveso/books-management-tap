const Router = require("express");
const Book = require("../model/Book");

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
  res.json(await Book.find());
});

bookRouter.get("/:id", async (req, res) => {
  res.json(await Book.findById(req.params.id));
});

bookRouter.post("/", async (req, res) => {
  res.json(await new Book(req.body).save());
});

bookRouter.put("/:id", async (req, res) => {
  res.json(await Book.findByIdAndUpdate(req.params.id, req.body));
});

bookRouter.delete("/:id", async (req, res) => {
  res.json(await Book.findByIdAndRemove(req.params.id));
});

module.exports = bookRouter;

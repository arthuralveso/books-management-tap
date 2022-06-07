const mongoose = require("mongoose");

const BookSchema = {
  title: String,
  author: String,
  genre: String,
  year: Number,
  price: Number,
};

module.exports = mongoose.model("Book", BookSchema);

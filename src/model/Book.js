const mongoose = require("mongoose");

const BookSchema = {
  title: String,
  author: String,
  genre: String,
  photo: String,
};

module.exports = mongoose.model("Book", BookSchema);

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Email = require("mongoose-type-email");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: Email, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database conected"));

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(parseInt(process.env.SERVER_PORT), () => {
  console.log(
    `the server is running on: http://localhost:${process.env.SERVER_PORT}`
  );
});

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");
connectDb();
app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync("../database/users.json"));
  res.send(users);
});

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

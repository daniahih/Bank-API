// const express = require("express");
// const app = express();
// const dotenv = require("dotenv").config();
// const fs = require("fs");
// const cors = require("cors");
// app.use(cors());
// const port = process.env.PORT || 5000;
// const mongoose = require("mongoose");
// const connectDb = require("./config/dbConnection");
// connectDb();
// app.get("/users", (req, res) => {
//   const users = JSON.parse(fs.readFileSync("../database/users.json"));
//   res.send(users);
// });

// mongoose.connection.once("open", () => {
//   console.log("connected to mongodb");
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// });
const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
app.use(cors());

connectDb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParse = require("body-parser");
const fs = require("fs");
const path = require("path");

//database
const connectDatabase = require("./database/database");

//middleware
const errorHandler = require("./middlewares/errorHandler");

//routers
const authRoute = require("./routes/auth.route.js");
const app = express();
const port = 3005;
const DB_URI = process.env.DB_URI;

//logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/log", "access.log")
);

//middlewares
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("tiny"));
app.use(bodyParse.json());
app.use(
  cors({
    origin: "*",
  })
);

//server checking
app.get("/api", function (req, res) {
  res.send("hello, world!");
});

//routing
app.use("/api/auth", authRoute);

//error handler
app.use(errorHandler);

const database = connectDatabase(DB_URI);

app.listen(port, () => {
  console.log(`server running on this port ${port}`);
});

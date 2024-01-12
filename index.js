const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3005;
const DB_URI = process.env.DB_URI;


//database
const connectDatabase = require("./database/database.js");

//middleware
const errorHandler = require("./middlewares/errorHandler.js");

//routers
const authRoute = require("./routes/auth.route.js");
const userRoute = require('./routes/user.route.js');

//logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/log", "access.log")
);

//middlewares
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cookieParser())
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
app.use("/api/user",userRoute)

//error handler
app.use(errorHandler);

const database = connectDatabase(DB_URI);

app.listen(port, () => {
  console.log(`server running on this port ${port}`);
});

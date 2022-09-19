const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const route = require("./routes");

const db = require("./config/db/index");

//Connect to Database
db.connect();

const app = express();

const port = process.env.PORT;

app.use(cookieParser());
// app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
//HTTP logger
app.use(morgan("combined"));

route(app);

app.listen(port, () => {
  console.log(`example listen on port ${port}`);
});

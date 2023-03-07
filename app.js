const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

//Connection db
require("./versions/v1/helpers/init.mongodb");
const app = express();
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

require("events").EventEmitter.defaultMaxListeners = 15;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// OK route.
app.get("/", (_req, res) => {
  console.log("here");
  res.send("OK");
});

const v1 = require("./versions/v1/routes");
app.use("/api/v1", v1);

app.use((req, res, next) => {
  const error = new Error("Bad Request");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

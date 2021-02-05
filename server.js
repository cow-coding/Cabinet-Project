// server.js

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var fs = require("fs");
var mongoose = require("mongoose");
var crypto = require("crypto");
var cookieParser = require("cookie-parser");
var passport = require("passport");

// view setting
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// app use setting
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());

var port = process.env.PORT || 8080;

// DB Connection
const dburl = "mongodb://localhost/Cabinet";
mongoose.connect(dburl, { useNewUrlParser: true });

// Configure Session
app.use(
  session({
    secret: "kbp0237",
    resave: false,
    saveUninitialized: true,
  })
);

// Defien Model
var User = require("./models/user");
var Cabinet = require("./models/cabinet_info");

// Configure Router
var router = require("./routes")(app, fs, crypto, User, Cabinet);

// Run Server
var server = app.listen(port, function () {
  console.log(`Express server has started on port ${port}`);
});

var express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user");

var app = express();
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/auth_demo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(
  require("express-session")({
    secret: "Alexis is the cutest among the cutest",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==========================
// ROUTES
//==========================

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

// Auth Routes

// show sign up form
app.get("/register", function(req, res) {
  res.render("register");
});

// handle user sign up
app.post("/register", function(req, res) {
  res.send("REGISTER POST ROUTE");
});

app.listen(3000, function() {
  console.log("Server has started...");
});

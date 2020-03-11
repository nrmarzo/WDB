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

app.use(bodyParser.urlencoded({ extended: true }));
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

// SIGN UP ROUTES
// show sign up form
app.get("/register", function(req, res) {
  res.render("register");
});

// handle user sign up
app.post("/register", function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/secret");
    });
  });
});

// LOGIN ROUTES
// render login form
app.get("/login", function(req, res) {
  res.render("login");
});

// login logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

app.listen(3000, function() {
  console.log("Server has started...");
});

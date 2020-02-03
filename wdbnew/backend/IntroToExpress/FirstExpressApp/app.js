var PORT = 3000;

var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hi");
});

app.get("/bye", function(req, res) {
  res.send("Goodbye");
});

app.get("/dog", function(req, res) {
  console.log("Someone made a request to /dog");
  res.send("Meow");
});

app.get("/r/:subredditName", function(req, res) {
  res.send("Welcome to the " + req.params.subredditName + " subreddit!");
});

app.get("*", function(req, res) {
  res.send("YOU ARE A STAR!");
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});

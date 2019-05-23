"use strict";
const PORT = 3000;

let express = require("express");
let app = express();

app.get("/", function(req, res) {
  res.send("Hi there!");
});

app.get("/bye", function(req, res) {
  res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
  console.log("Someone made a request to /dog");
  res.send("Meow!");
});

app.get("/r/:subredditName", function(req, res) {
  let subreddit = req.params.subredditName;
  res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
  console.log(req.params);

  res.send("Welcome to the comments page!");
});

app.get("*", function(req, res) {
  res.send("You are a star!");
});

// Tell Express to listen for requests (start server);
app.listen(PORT, function() {
  console.log("Serving dog demo on port " + PORT);
});

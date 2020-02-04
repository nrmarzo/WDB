const PORT = 3000;

var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("love", { thingVar: thing });
});

app.get("/posts", function(req, res) {
  var posts = [
    { title: "Post 1", author: "Alexis" },
    { title: "My Adorable Alexis", author: "Neileu" },
    { title: "Can you believe this cutie?", author: "NLex" }
  ];

  res.render("posts", { posts: posts });
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});

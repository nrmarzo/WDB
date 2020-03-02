var express = require("express");
var app = express();

const PORT = 3000;

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
  var animal = req.params.animal.toLowerCase();

  var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof woof!",
    cat: "I hate you human",
    goldfish: "..."
  };

  res.send("The " + animal + " says '" + sounds[animal] + "'");
});

app.get("/repeat/:message/:times", function(req, res) {
  var message = req.params.message;
  var times = Number(req.params.times);
  var result = "";

  for (var i = 0; i < times; i++) {
    result += message + " ";
  }

  res.send(result);
});

app.get("*", function(req, res) {
  res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});

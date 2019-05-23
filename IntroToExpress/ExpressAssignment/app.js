"use strict";
const PORT = 3000;
let express = require("express");
let app = express();

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
  let animal = req.params.animal;
  let sound;

  if (animal == "pig") {
    sound = "Oink";
  } else if (animal == "cow") {
    sound = "Moo";
  } else if (animal == "dog") {
    sound = "Woof Woof";
  }

  res.send("The " + animal + " says '" + sound + "!'");
});

app.get("/repeat/:word/:numTimes", function(req, res) {
  let word = req.params.word;
  let numTimes = req.params.numTimes;
  let output = "";

  for (let i = 0; i < numTimes; i++) {
    output += word;
    output += " ";
  }

  res.send(output);
});

app.get("*", function(req, res) {
  res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});

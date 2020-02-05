var express = require("express");
var app = express();

var campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2f72d79f4bc45f_340.jpg"
  },
  {
    name: "Granite Hill",
    image:
      "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f72d79f4bc45f_340.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c7d2f72d79f4bc45f_340.jpg"
  }
];

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(3000, function() {
  console.log("YelpCamp Server has started...");
});

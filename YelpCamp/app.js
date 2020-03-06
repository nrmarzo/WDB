var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.set("useUnifiedTopology", false);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.render("landing");
});

// ===========================
// CAMPGROUNDS ROUTES
// ===========================

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;

  // Create a new campground and save to DB
  var newCampground = { name: name, image: image, description: desc };
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// SHOW - show info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        // render show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// ===========================
// COMMENTS ROUTES
// ===========================

// NEW route
app.get("/campgrounds/:id/comments/new", function(req, res) {
  res.render("comments/new");
});

app.listen(3000, function() {
  console.log("YelpCamp Server has started...");
});

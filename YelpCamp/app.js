"use strict";
const PORT = 3000;
let express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water."
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly created campground");
//       console.log(campground);
//     }
//   }
// );

app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX - Display all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });

  // res.render("campgrounds", { campgrounds: campgrounds });
});

// NEW - Show the form to add new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };

  // Create new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // Find the campground with provided ID
  // Campground.findById(req.params.id, function(err, foun))
  // render show template with that ID
  res.render("show");
});

app.listen(PORT, function() {
  console.log("YelpCamp Server has started on port " + PORT);
});

/*===========================================================================
=============================================================================
RESTFUL ROUTES

name       url                 verb          desc.
------------------------------------------------------------------------------
INDEX     /campgrounds         GET           Display all campgrounds
NEW				/campgrounds/new     GET           Show form to create new campgroud
CREATE    /campgrounds         POST          Add new campground to DB
SHOW			/campgrounds/:id     GET           Shows info about one campground

=============================================================================
===========================================================================*/

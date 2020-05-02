var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// INDEX - show all campgrounds
router.get("/", function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
router.post("/", isLoggedIn, function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };

  // Create a new campground and save to DB
  var newCampground = { name: name, image: image, description: desc, author: author };
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// SHOW - show info about one campground
router.get("/:id", function (req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        // render show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// EDIT - edit campground
router.get("/:id/edit", checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE - update campground
router.put("/:id", checkCampgroundOwnership, function (req, res) {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    updatedCampground
  ) {
    res.redirect("/campgrounds/" + req.params.id);
  });
});

// DESTROY - destroy campground
router.delete("/:id", checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err, removedCampground) {
    // delete all associated comments on the campground!
    Comment.deleteMany({ _id: { $in: removedCampground.comments } }, function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/campgrounds");
    });
  });
});

// ===========================
// MIDDLE WARE
// ===========================
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
  // check if user logged in
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        // check if current user owns the campground
        // (.equals is used because foundCampground.author.id is a string, and req.user._id is an object)

        if (foundCampground.author.id.equals(req.user._id)) {
          // move on to the rest of the code (after middleware)
          next();
        } else {
          // otherwise, redirect
          console.log("You don't have permission to do that.");
          res.redirect("back");
        }
      }
    });
  } else {
    // if not, redirect
    console.log("You need to be logged in to do that.");
    res.redirect("back");
  }
}

module.exports = router;

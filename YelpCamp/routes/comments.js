var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// comment NEW route
router.get("/new", isLoggedIn, function (req, res) {
  // find campground by ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

// comment CREATE route
router.post("/", isLoggedIn, function (req, res) {
  // lookup campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new comment
      // connect new comment to campground
      // redirect to campground show page
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;

          // save comment
          comment.save();

          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// comment EDIT route
router.get("/:comment_id/edit", checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
    }
  });
});

// comment UPDATE route
router.put("/:comment_id", checkCommentOwnership, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// comment DELETE route
router.delete("/:comment_id", checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err, removedCampground) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
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

function checkCommentOwnership(req, res, next) {
  // check if user logged in
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        // check if current user owns the comment
        // (.equals is used because foundComment.author.id is a string, and req.user._id is an object)

        if (foundComment.author.id.equals(req.user._id)) {
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

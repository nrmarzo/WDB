const PORT = 3000;

var expressSanitizer = require("express-sanitizer"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

// INDEX route
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// CREATE route
app.post("/blogs", function(req, res) {
  // sanitize input (removes script tags)
  req.body.blog.body = req.sanitize(req.body.blog.body);

  // create blog
  // redirect to the index
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW route
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// EDIT route
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// UPDATE route
app.put("/blogs/:id", function(req, res) {
  // sanitize input (removes script tags)
  req.body.blog.body = req.sanitize(req.body.blog.body);

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// DESTROY route
app.delete("/blogs/:id", function(req, res) {
  // destroy blog
  // redirect
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(PORT, function() {
  console.log("RESTfulBlogApp server is running.");
});

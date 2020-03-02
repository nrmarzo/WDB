var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// add new cat to the DB
// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 75,
//   temperament: "evil"
// });

// george.save(function(err, cat) {
//   if (err) {
//     console.log("Something went wrong");
//   } else {
//     console.log("CAT SAVED TO THE DB:");
//     console.log(cat);
//   }
// });

Cat.create(
  {
    name: "Snow White",
    age: 5,
    temperament: "bland"
  },
  function(err, cat) {
    if (err) {
      console.log(err);
    } else {
      console.log(cat);
    }
  }
);

// retrieve all cats from DB and console.log each one
Cat.find({}, function(err, cats) {
  if (err) {
    console.log("Something went wrong during find");
    console.log(err);
  } else {
    console.log("ALL THE CATS....");
    console.log(cats);
  }
});

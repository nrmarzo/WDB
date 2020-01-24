var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("picked-color");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");

colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
  // add initial colors
  squares[i].style.backgroundColor = colors[i];

  // add click listeners to squares
  squares[i].addEventListener("click", function() {
    // grab color of clicked square
    var clickedColor = this.style.backgroundColor;

    // compare color to picked color
    if (clickedColor === pickedColor) {
      messageDisplay.textContent = "Correct!";
      changeColors(clickedColor);
      h1.style.backgroundColor = clickedColor;
    } else {
      messageDisplay.textContent = "Try Again";
      this.style.backgroundColor = "#232323";
    }
  });
}

function changeColors(color) {
  // loop through all squares
  // change each color to match given color
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  var arr = [];

  // add num random colors to array
  for (var i = 0; i < num; i++) {
    // get random color and push into array
    arr.push(randomColor());
  }

  // return that array
  return arr;
}

function randomColor() {
  // pick a "red" from 0-255
  // pick a "green" from 0-255
  // pick a "blue" from 0-255
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var resetButton = document.querySelector("#reset");

var p1Display = document.querySelector("#p1-score");
var p2Display = document.querySelector("#p2-score");
var winningScoreDisplay = document.querySelector("p span");

var numInput = document.querySelector("input");

var p1Score = 0;
var p2Score = 0;

var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function() {
  if (!gameOver) {
    p1Score++;
    p1Display.textContent = p1Score;
    checkForWinner();
  }
});

p2Button.addEventListener("click", function() {
  if (!gameOver) {
    p2Score++;
    p2Display.textContent = p2Score;
    checkForWinner();
  }
});

resetButton.addEventListener("click", function() {
  reset();
});

numInput.addEventListener("change", function() {
  winningScoreDisplay.textContent = this.value;
  winningScore = Number(this.value);
  reset();
});

function checkForWinner() {
  if (p1Score === winningScore) {
    p1Display.classList.add("winner");
    gameOver = true;
  } else if (p2Score === winningScore) {
    p2Display.classList.add("winner");
    gameOver = true;
  }
}

function reset() {
  p1Score = 0;
  p2Score = 0;
  gameOver = false;

  p1Display.textContent = p1Score;
  p2Display.textContent = p2Score;

  p1Display.classList.remove("winner");
  p2Display.classList.remove("winner");
}
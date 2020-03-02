function average(scores) {
  var numScores = scores.length;
  var sum = 0;

  scores.forEach(function(score) {
    sum += score;
  });

  return Math.round(sum / numScores);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); // 94

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2)); //68

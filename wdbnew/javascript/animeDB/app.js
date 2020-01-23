var animes = [
  {
    title: "Full Metal Alchemist: Brotherhood",
    rating: 10,
    hasWatched: true
  },
  {
    title: "Naruto",
    rating: 8,
    hasWatched: false
  },
  {
    title: "Haikyuu",
    rating: 10,
    hasWatched: true
  },
  {
    title: "Boku No Hero Academia",
    rating: 9,
    hasWatched: true
  },
  {
    title: "Shingeki no Kyojin",
    rating: 8,
    hasWatched: false
  }
];

animes.forEach(function(anime) {
  var result = "You have ";
  if (anime.hasWatched) {
    result += "watched ";
  } else {
    result += "not watched ";
  }

  result += '"' + anime.title + '" - ' + anime.rating + " stars";
  console.log(result);
});

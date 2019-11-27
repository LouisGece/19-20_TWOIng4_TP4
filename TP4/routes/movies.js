var express = require('express');
var router = express.Router();
const axios = require("axios");
var _ = require('lodash');

API_KEY = "b0f1bc0d";
API_URL = "http://www.omdbapi.com/";

var ListMovies = [{
  id: "30",
  movie: "yoyo",
  yearOfRelease: "1990",
  duration: "67", // en minutes,
  actors: ["Paul", "Jacques"],
  poster: "oui", // lien vers une image d'affiche,
  boxOffice: "5000", // en USD$,
  rottenTomatoesScore: "7",
 }]


/* GET movies. */
router.get('/', function(req, res, next) {
    res.status(200).json({
      ListMovies : ListMovies
    })
  });

/* GET movies selon id */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const selec = _.find(ListMovies, ["id", id]);
  console.log("title", id, selec);
  res.status(200).json({
    message: 'Voici le film :',
    selec
  });
});

/* PUT movie */
router.put("/:title", (req, res) => {
  const {title} = req.params;
  axios.get(`${API_URL}?t=${title}&apikey=${API_KEY}`).then(({data}) => {
    const id = _.uniqueId();
    const titre = data.Title;
    const an = data.Year;
    const temps = data.Runtime;
    const acteur = data.Actors;
    const poster = data.Poster;
    const office = data.BoxOffice;
    const rate = data.Ratings[1].Value;
    const list ={"id":id, "movie":titre, "yearOfRelease": an, "duration": temps, "actors": acteur, "poster": poster, "boxOffice": office, "rottenTomatoesScore": rate};
    ListMovies.push(list);
  res.status(200).json ({
    message: `${title} ajouté à la base de donnée`,
    movie: title,
  });
});
});

/* DELETE movie */
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  _.remove(ListMovies, ["id", id]);
  res.status(200).json({
    message: `${id} retiré `
  })
})

/* POST movie */
router.post('/:id/:title', (req, res) => {
  const{id} = req.params;
  const{title} = req.params;
  const update = _.find(ListMovies, ["id", id]);
  update.movie = title;
  res.status(200).json({
    message: `${id} update `
  })
})

module.exports = router;
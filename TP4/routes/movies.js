var express = require('express');
var router = express.Router();
const axios = require("axios");
var _ = require('lodash');

API_KEY = "b0f1bc0d";
API_URL = "http://www.omdbapi.com/";

var ListMovies = [];

/* GET movies. */
router.get('/', function(req, res, next) {
    res.status(200).json({
      ListMovies
    })
  });

/* GET movies selon id */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const selec = _.find(ListMovies, ["id", id]);
  console.log("title", id, selec);
  res.status(200).json({
    message: 'trouvé',
    selec
  });
});

/* PUT movie */
router.put("/", (req, res) => {
  const {title} = req.body;
  axios.get(`${API_URL}?t=${title}&apikey=${API_KEY}`).then(({data}) => {
    const id = _.uniqueId();
    const title = data.Title;
    const annee = data.Year;
    const temps = data.Runtime;
    const acteur = data.Actors;
    const poster = data.Poster;
    const office = data.BoxOffice;
    const notes = data.Ratings[1].Value;
    const list ={"id":id, "movie":title, "yearOfRelease": annee, "duration": temps, "actors": acteur, "poster": poster, "boxOffice": office, "rottenTomatoesScore": notes};
    ListMovies.push(list)
  });
  res.status(200).json ({
    message: `${title} ajouté à la base de donnée`
  });
});

/* DELETE movie */
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  _.remove(ListMovies, ["id", id]);
  res.status(200).json({
    message: '${id} retiré'
  })
})

/* POST movie */
router.post('/:id', (req, res) => {
  const{id} = req.params;
  const{movie} = req.body;
  const update = _.find(ListMovies, ["id", id]);
  update.movie = movie;
  res.status(200).json({
    message: '${id} update'
  })
})

module.exports = router;
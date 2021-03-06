const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getMovies, createMovie, deleteMovie } = require("../controllers/movies");
const regExp = require("../regexp/regexp");

router.get("/movies", getMovies);
router.post("/movies", celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number(),
    year: Joi.string().min(2).max(30),
    description: Joi.string().min(2).max(80),
    image: Joi.string().required().pattern(regExp),
    trailer: Joi.string().required().pattern(regExp),
    nameRU: Joi.string().min(2).max(30),
    nameEN: Joi.string().min(2).max(30),
    thumbnail: Joi.string().required().pattern(regExp),
    movieId: Joi.string(),
  }),
}), createMovie);
router.delete("/movies/:_id", celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;

const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");
const Forbidden = require("../errors/Forbidden");
const Movie = require("../models/movie");

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === "ValidationError") {
        next(new BadRequest("Переданы некорректные данные при создании карточки"));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const id = req.user._id;
  Movie.findByIdAndRemove(req.params.id)
    .orFail(new Error("NotFound"))
    .then((movie) => {
      if (movie.owner.toString() !== id) {
        throw new Forbidden("Нет прав для удаления фильма");
      }
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.message === "NotFound") {
        next(new NotFound("Фильм с указанным id не найден"));
      }
      next(err);
    });
};

const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const InvalidDataError = require('../errors/InvalidDataError');
const ErrForbidden = require('../errors/ErrForbidden');

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
      } else {
        next(error);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError('Фильм для удаления не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ErrForbidden('нет прав у текущего пользователя');
      }
      return movie.remove()
        .then(() => res.send({ message: 'фильм успешно удален' }));
    })
    .catch(next);
};

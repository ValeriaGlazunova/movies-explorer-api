const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegExp } = require('../utils/constants');

const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().regex(linkRegExp).required(),
      trailerLink: Joi.string().regex(linkRegExp).required(),
      thumbnail: Joi.string().regex(linkRegExp).required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  postMovie,
);

movieRouter.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.number().required().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;

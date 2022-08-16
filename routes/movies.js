const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

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
      image: Joi.string().required().custom((value, error) => {
        if (isURL(value)) {
          return value;
        }
        return error.message('Некорректный формат ссылки');
      }),
      trailerLink: Joi.string().required().custom((value, error) => {
        if (isURL(value)) {
          return value;
        }
        return error.message('Некорректный формат ссылки');
      }),
      thumbnail: Joi.string().required().custom((value, error) => {
        if (isURL(value)) {
          return value;
        }
        return error.message('Некорректный формат ссылки');
      }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  postMovie,
);

movieRouter.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;

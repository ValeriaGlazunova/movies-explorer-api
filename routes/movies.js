const movieRouter = require('express').Router();

const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post('/', postMovie);

movieRouter.delete('/_id', deleteMovie);

module.exports = movieRouter;

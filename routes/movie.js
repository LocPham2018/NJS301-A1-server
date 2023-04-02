const express = require('express');
const movieController = require('../controllers/movie');

const movieRoute = express.Router();

movieRoute.get('/trending', movieController.getTrending);

movieRoute.get('/top-rate', movieController.getTopRated);

movieRoute.get('/discover/:genreId', movieController.getByGenre);

movieRoute.get('/video/:movieId', movieController.getTrailerById);

movieRoute.get('/search', movieController.searchByQuery);

module.exports = movieRoute;

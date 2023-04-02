const paging = require('../utils/paging');
const Movies = require('../models/movie');
const Videos = require('../models/video');

exports.getTrending = (req, res, next) => {
	const { page } = req.query;
	const pageNum = page ? +page : 1;
	const list = Movies.getTrending();
	const responseData = paging(list, pageNum);
	res.json(responseData);
};

exports.getTopRated = (req, res, next) => {
	const { page } = req.query;
	const pageNum = page ? +page : 1;
	const list = Movies.getTopRated();
	const responseData = paging(list, pageNum);
	res.json(responseData);
};

exports.getByGenre = (req, res, next) => {
	const { genreId } = req.params;
	if (!genreId || isNaN(genreId)) {
		return res.status(400).json({ message: 'Not found genre param' });
	}
	const { page } = req.query;
	const pageNum = page ? +page : 1;
	const { list, genre_name } = Movies.getByGenre(+genreId);
	if (!list) {
		return res.status(404).json({ message: 'Not found that genre id' });
	}
	const response = paging(list, pageNum);
	const responseData = { ...response, genre_name };
	res.json(responseData);
};

exports.getTrailerById = (req, res, next) => {
	const { movieId } = req.params;
	if (!movieId || isNaN(movieId)) {
		return res.status(400).json({ message: 'Not found film id param' });
	}
	const video = Videos.getTrailerById(+movieId);
	if (!video) {
		return res.status(404).json({ message: 'Not found video' });
	}
	res.json({ results: video });
};

exports.searchByQuery = (req, res, next) => {
	const { keyword } = req.query;
	if (!keyword) {
		return res.status(400).json({ message: 'Not found keyword param' });
	}
	const { page } = req.query;
	const pageNum = page ? +page : 1;
	const list = Movies.search(keyword);
	const responseData = paging(list, pageNum);
	res.json(responseData);
};

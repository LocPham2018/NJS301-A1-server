const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'movieList.json');
const GENRE_PATH = path.join(__dirname, '..', 'data', 'genreList.json');
const VIDEO_PATH = path.join(__dirname, '..', 'data', 'videoList.json');

const Genres = {
	all: function () {
		return JSON.parse(fs.readFileSync(GENRE_PATH, 'utf8'));
	},
};

const Movies = {
	all: function () {
		return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
	},
	getTrending: function () {
		return this.all().sort((movie1, movie2) =>
			movie1.popularity > movie2.popularity ? -1 : 1
		);
	},
	getTopRated: function () {
		return this.all().sort((movie1, movie2) =>
			movie1.vote_average > movie2.vote_average ? -1 : 1
		);
	},
	getByGenre: function (genreId) {
		const foundGenre = Genres.all().filter(type => type.id === genreId);
		if (foundGenre.length === 0) {
			return null;
		}
		const genre = foundGenre[0].name;
		const list = this.all().filter(movie =>
			movie.genre_ids.includes(genreId)
		);
		return { list, genre_name: genre };
	},
	search: function (keyword) {
		return this.all().filter(movie => {
			const title = movie.title ? movie.title : movie.name;
			return (
				title.toLowerCase().includes(keyword) ||
				movie.overview.toLowerCase().includes(keyword)
			);
		});
	},
};

module.exports = Movies;

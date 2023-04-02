const fs = require('fs');
const path = require('path');

const VIDEO_PATH = path.join(__dirname, '..', 'data', 'videoList.json');

const Videos = {
	all: function () {
		return JSON.parse(fs.readFileSync(VIDEO_PATH, 'utf8'));
	},
	getTrailerById: function (id) {
		const result = this.all().filter(film => film.id === id);
		if (result.length === 0) {
			return null;
		}
		const videos = result[0].videos
			.filter(
				video =>
					video.official &&
					video.site === 'YouTube' &&
					(video.type === 'Trailer' || video.type === 'Teaser')
			)
			.sort((video1, video2) =>
				video1.published_at > video2.published_at ? -1 : 1
			);
		if (videos.length === 0) {
			return null;
		}
		return videos[0];
	},
};

module.exports = Videos;

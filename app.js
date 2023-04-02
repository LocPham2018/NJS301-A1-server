const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const movieRoute = require('./routes/movie');
const authMiddleware = require('./middleware/auth');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: '*',
		methods: ['GET'],
	})
);

app.all('/', (req, res, next) => {
	res.header('Content-Type', 'application/json');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

app.use(express.json());
app.use(helmet());

app.use('/api/movies', authMiddleware, movieRoute);

app.use('/', (req, res, next) => {
	res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT);

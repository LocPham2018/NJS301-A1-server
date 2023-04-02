const fs = require('fs');
const path = require('path');

const API_PATH = path.join(__dirname, '..', 'data', 'userToken.json');

module.exports = (req, res, next) => {
	const { apiToken } = req.query;
	if (!apiToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const tokenList = JSON.parse(fs.readFileSync(API_PATH, 'utf8'));
	const foundUserId = tokenList.findIndex(user => user.token === apiToken);
	if (foundUserId === -1) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	next();
};

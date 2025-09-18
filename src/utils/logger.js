const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../../logs/publish.log');

if (!fs.existsSync(path.dirname(logPath))) {
	fs.mkdirSync(path.dirname(logPath), { recursive: true });
}

function logAttempt(feed, article, result) {
	const logEntry = {
		timestamp: new Date().toISOString(),
		feed,
		title: article.title,
		result: result.success ? 'SUCCESS' : `FAILURE: ${result.message}`
	};

	fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
}

module.exports = { logAttempt };

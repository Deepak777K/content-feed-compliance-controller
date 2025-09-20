const express = require('express');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const router = express.Router();
const logFilePath = path.join(__dirname, '../../logs/publish.log');

router.get('/', async (req, res) => {
	const { feed, result } = req.query;
	const logs = [];

	try {
		const fileStream = fs.createReadStream(logFilePath);
		const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

		for await (const line of rl) {
			try {
				const entry = JSON.parse(line);
				if (
					(!feed || entry.feed === feed) &&
					(!result || entry.result.includes(result))
				) {
					logs.push(entry);
				}
			} catch (err) {
				continue;
			}
		}

		res.json(logs);
	} catch (err) {
		console.error('Error reading log file:', err);
		res.status(500).json({ error: 'Unable to read logs' });
	}
});

module.exports = router;

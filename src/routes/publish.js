const express = require('express');
const router = express.Router();
const validators = require('../checks');
const { logAttempt } = require('../utils/logger');

router.post('/', (req, res) => {
	const { title, body, feed } = req.body;

	if (!title || !body || !feed) {
		return res.status(400).json({ error: 'Missing title, body, or feed' });
	}

	const article = { title, body };
	const validator = validators[feed];

	if (!validator) {
		const result = { success: false, message: `Unknown feed: ${feed}` };
		logAttempt(feed, article, result);
		return res.status(400).json({ error: result.message });
	}

	const result = validator(article);
	logAttempt(feed, article, result);

	if (!result.success) {
		return res.status(400).json({ error: result.message });
	}

	return res.json({ message: `Article submitted successfully to ${feed}` });
});

module.exports = router;

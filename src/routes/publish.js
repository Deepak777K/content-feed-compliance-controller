const express = require('express');
const router = express.Router();
const validators = require('../checks');

router.post('/', (req, res) => {
	const { title, body, feed } = req.body;

	if (!title || !body || !feed) {
		return res.status(400).json({ error: 'Missing title, body, or feed' });
	}

	const article = { title, body };

	const validator = validators[feed];
	if (!validator) {
		return res.status(400).json({ error: `Unknown feed: ${feed}` });
	}

	const result = validator(article);

	if (!result.success) {
		return res.status(400).json({ error: result.message });
	}

	return res.json({ message: `Article submitted successfully to ${feed}` });
});

module.exports = router;

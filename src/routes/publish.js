const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { title, body, feed } = req.body;

	if (!title || !body || !feed) {
		return res.status(400).json({ error: 'Missing title, body, or feed' });
	}

	return res.json({ message: `Article submitted successfully to ${feed}` });
});

module.exports = router;

function validateMSN(article) {
	const errors = [];

	if (article.title.length > 100) {
		errors.push('MSN: Title exceeds 100 characters.');
	}

	const word = 'bad-word';
	const bodyLower = article.body.toLowerCase();

	if (bodyLower.includes(word)) {
		errors.push(`MSN: Prohibited content detected ("${word}").`);
	}

	if (errors.length > 0) {
		return { success: false, message: errors.join(' ') };
	}

	return { success: true };
}

module.exports = validateMSN;
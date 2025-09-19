const validateMSN = require('../src/checks/msn');

describe('MSN Validator', () => {
	it('should fail if title is too long', () => {
		const result = validateMSN({
			title: 'a'.repeat(101),
			body: 'This is clean body text.'
		});

		expect(result.success).toBe(false);
		expect(result.message).toContain('Title exceeds 100 characters');
	});

	it('should fail if body contains prohibited words', () => {
		const result = validateMSN({
			title: 'Valid Title',
			body: 'This contains a bad-word inside.'
		});

		expect(result.success).toBe(false);
		expect(result.message).toContain('Prohibited content detected');
		expect(result.message).toContain('bad-word');
	});

	it('should pass with a valid article', () => {
		const result = validateMSN({
			title: 'Clean Title',
			body: 'Safe body content without any prohibited terms.'
		});

		expect(result.success).toBe(true);
		expect(result.message).toBeUndefined();
	});
});

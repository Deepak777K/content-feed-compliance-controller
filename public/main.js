document.getElementById('articleForm').addEventListener('submit', async function (e) {
	e.preventDefault();

	const title = document.getElementById('title').value;
	const body = document.getElementById('body').value;
	const feed = document.getElementById('feed').value;
	const resBox = document.getElementById('response');
	resBox.style.color = 'black';
	resBox.innerText = 'Submitting...';

	try {
		const res = await fetch('/api/publish', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, body, feed })
		});

		const data = await res.json();
		resBox.style.color = res.ok ? 'green' : 'red';
		resBox.innerText = res.ok ? data.message : data.error;
	} catch (err) {
		resBox.style.color = 'red';
		resBox.innerText = `Error submitting article`;
	}
});

document.getElementById('loadLogsBtn').addEventListener('click', async () => {
	const logsTableBody = document.getElementById('logsTableBody');
	logsTableBody.innerHTML = '<tr><td colspan="4">Loading logs...</td></tr>';

	try {
		const res = await fetch('/api/logs');
		const data = await res.json();

		if (!Array.isArray(data)) {
			logsTableBody.innerHTML = '<tr><td colspan="4">Failed to load logs.</td></tr>';
			return;
		}

		if (data.length === 0) {
			logsTableBody.innerHTML = '<tr><td colspan="4">No logs found.</td></tr>';
			return;
		}

		logsTableBody.innerHTML = '';
		const fragment = document.createDocumentFragment();

		data.forEach(log => {
			const row = document.createElement('tr');

			const timestampCell = document.createElement('td');
			timestampCell.textContent = new Date(log.timestamp).toLocaleString();

			const feedCell = document.createElement('td');
			feedCell.textContent = log.feed;

			const titleCell = document.createElement('td');
			titleCell.textContent = log.title;

			const resultCell = document.createElement('td');
			resultCell.textContent = log.result;
			resultCell.className = log.result.includes('SUCCESS') ? 'success' : 'failure';

			row.appendChild(timestampCell);
			row.appendChild(feedCell);
			row.appendChild(titleCell);
			row.appendChild(resultCell);

			fragment.appendChild(row);
		});

		logsTableBody.appendChild(fragment);
	} catch (err) {
		console.error('Log fetch error:', err);
		logsTableBody.innerHTML = '<tr><td colspan="4">Error fetching logs.</td></tr>';
	}
});

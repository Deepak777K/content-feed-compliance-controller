const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const publishRouter = require('./routes/publish');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/publish', publishRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

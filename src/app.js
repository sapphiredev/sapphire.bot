const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.json('hello');
});

app.listen(8011);
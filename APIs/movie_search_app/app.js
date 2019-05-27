'use strict';
const PORT = 3000;

let express = require('express');
let app = express();
let request = require('request');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('search');
});

app.get('/results', function(req, res) {
	const apiKey = '&apikey=thewdb';
	let query = req.query.search;

	let url = 'http://www.omdbapi.com/?s=' + query + apiKey;

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			let data = JSON.parse(body);
			res.render('results', { data: data });
		}
	});
});

app.listen(PORT, function() {
	console.log('Server started on port ' + PORT);
});

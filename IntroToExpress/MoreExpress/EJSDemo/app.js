'use strict';
const PORT = 3000;

let express = require('express');
let app = express();

// tells express to serve the content of the "public" directory
app.use(express.static('public'));

// tells express that we're going to use EJS ahead of time
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/fallinlovewith/:thing', function(req, res) {
	let thing = req.params.thing;
	res.render('love', { thingVar: thing });
});

app.get('/posts', function(req, res) {
	let posts = [
		{ title: 'Post 1', author: 'Posty' },
		{ title: 'My adorable alexis', author: 'Neileu' },
		{ title: 'My Babu Cutie', author: 'Welleu' }
	];

	res.render('posts', { posts: posts });
});

app.listen(PORT, function(req, res) {
	console.log('Server started on port ' + PORT);
});

'use strict';
const PORT = 3000;

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let friends = [ 'Alexis', 'Dianne', 'Neileu', 'Romwelleu' ];

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/friends', function(req, res) {
	res.render('friends', { friends: friends });
});

app.post('/addfriend', function(req, res) {
	let newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect('/friends');
});

app.listen(PORT, function() {
	console.log('Server running on port ' + PORT);
});

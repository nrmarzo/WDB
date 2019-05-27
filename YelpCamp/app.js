'use strict';
const PORT = 3000;
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let campgrounds = [
	{ name: 'Jenny Lake Camp', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg' },
	{ name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg' },
	{ name: "Mountain Goat's Rest", image: 'https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg' },
	{ name: 'Jenny Lake Camp', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg' },
	{ name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg' },
	{ name: 'Jenny Lake Camp', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg' },
	{ name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg' },
	{ name: 'Jenny Lake Camp', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg' },
	{ name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg' },
	{ name: 'Jenny Lake Camp', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg' },
	{ name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg' },
	{ name: 'Jenny Lake Camp', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg' },
	{ name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg' }
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = { name: name, image: image };
	campgrounds.push(newCampground);

	// redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.listen(PORT, function() {
	console.log('YelpCamp Server has started on port ' + PORT);
});

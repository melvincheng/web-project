var express = require('express');
var app = express();
var session = require('express-session');
var uuid = require('node-uuid');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('localhost:27017/allNews')

var Schema = mongoose.Schema
var userSchema = new Schema({
	username: {type: String,
			  unique: true,
			  index: true},
	password: String,
	category: [String],
	source: [String]
});

var User = mongoose.model('user', userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views', __dirname + '/views');	
app.set('view engine', 'pug');

app.use(session({
	genid: function(request) {
		return uuid.v4();
	},
	resave: false,
	saveUninitialized: false,
	secret: 'super secret secret'
}));	



function notLogged(request, response, next) {
	if(request.session.username){
		response.redirect('/');
	} else {
		next();
	}
}

function logged(request, response, next) {
	if(request.session.username){
		next();
	} else {
		response.redirect('/');
	}
}

function getUsername(request) {
	var username = '';
	if(request.session.username) {
		username = request.session.username;
	}
	return username;
}

app.post('data.js', function(request, response) {
	response.send('lel');
});



app.get('/', function(request, response){
	var category = [];
	var source = [];
	User.findOne({username: getUsername(request)}, {category: 1, source: 1}, function(err, doc) {
		if(doc){
			category = doc.category;
			source = doc.source;
			}
	}).then(function (){
		response.render('main', {username:getUsername(request), category: category, source: source} );
	});	
});

app.get('/login', notLogged, function(request, response){
	response.render('login');
});

app.get('/postLogin', function(request, response){
	response.redirect('/login');
});

app.post('/postLogin', function(request, response){
	var username = request.body.username;
	var password = request.body.password;
	if (username.trim() === '') {
		response.render('login', {errorMessage:'Username cannot be blank/empty'});
	} else if (password.trim() === '') {
		response.render('login', {errorMessage:'Password cannot be blank/empty'});
	} else {
		User.find({username: username}).then(function(result){
			if(result.length > 0) {
					if(bcrypt.compareSync(password, result[0].password)){
						request.session.username = username;
						response.redirect('/');
					} else {
						response.render('login', {errorMessage:'Password is incorrect'});
					}
			} else {
				response.render('login', {errorMessage:'Username does not exist'});
			}
		});
	}
});


app.get('/registration', notLogged, function(request, response){
	response.render('registration');
});

app.get('/postRegistration', function(request, response){
	response.redirect('/registration');
});

app.post('/postRegistration', function(request, response){
	var username = request.body.username;
	var password = request.body.password;
	var confirm = request.body.confirm;
	if(username.trim() === '') {
		response.render('registration', {errorMessage: 'Username cannot be blank/empty'});
	} else if (password.trim() === ''){
		response.render('registration', {errorMessage: 'Password cannot be blank/empty'});
	} else {
		User.find({username: username}).then(function(result){
			if (result.length > 0) {
				response.render('registration', {errorMessage: 'Username taken'});	
	
			} else if (!(password === confirm)) {
				response.render('registration', {errorMessage: 'Passwords does not match'});
			} else {
				var hash = bcrypt.hashSync(password);
				var newUser = new User({username:username, password: hash, category: [], source: [], });
				newUser.save(function(error){
					if(error) {
						response.render('registration', {message: 'An error occur while trying to register'});	
					} else {
						response.render('login', {message: 'Registration successful'});
					}
				});
			}
		});
	}
});

app.get('/settings', logged, function(request, response){
	User.findOne({username: getUsername(request)}, {category: 1, source: 1}, function(err, doc) {
		if(doc){
			category = doc.category;
			source = doc.source;
			}
	}).then(function (){
		response.render('settings', {username: request.session.username, category: category, source: source});
	});	
});

app.get('/save', logged, function (request, response) {
	var newSource = request.query.userSelected;
	var message;
	User.findOneAndUpdate({username: request.session.username}, {source: newSource}, function (err, doc) {
		if(err) {
			message = "Failed to update settings";
		}
		if(doc) {
			message = "Settings have been successfully updated";
		}
		response.redirect('/');
	});
});


app.get('/logout', function(request, response){
	request.session.destroy();
	response.redirect('/');
});



app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});


const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017/";
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
const session = require('express-session');
app.use(express.static('./assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
var db;



MongoClient.connect(process.env.uri, function (err, client) {
  if (err) throw err;
  db = client.db('Uglies');
  app.listen(8080);
  console.log("Running on 8080")
});

//Redirecting user to the correct index page
app.get('/', function (req, res) {
  res.render('pages/index.ejs');
});

/*Fetching data of the events 
app.get('/Events', function (req, res) {
  db.collection('Events').find(req.body).toArray(function (err, result) {
      if (err) throw err;
      posts = JSON.parse(JSON.stringify(result));
      if (req.session.loggedin) {

      }
      res.render('pages/events.ejs', {
          posts: posts,
          session: req.session
      });

  });
}); */

//Redirecting user to the Login
app.get('/Login', function (req, res) {
  res.render('pages/login.ejs');
});

//Redirecting user to the Your Page
app.get('/Yourpage', function (req, res) {
  res.render('pages/yourpage.ejs');
});

//Login code for users to log in into website
//Repurposed from the CodeShack
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute DBMongo query that'll select the account from the database based on the specified username and password
    db.collection('Logininfo').find({ "Username": username }).toArray(function (err, result) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//Fetching data of the events 
app.get('/Events', function (req, res) {
  db.collection('Events').find(req.body).toArray(function (err, result) {
      if (err) throw err;
      pages = JSON.parse(JSON.stringify(result));
      //if (req.session.loggedin) {

      //}
      res.render('pages/events.ejs', {
          pages: pages,
          session: req.session
      });

  });
});

//Fetching data of the users
app.get('/Logininfo', function (req, res){
  db.collection('Logininfo').find(req.body).toArray(function (err, result) {
    if (err) throw err;
    pages = JSON.parse(JSON.stringify(result));
    res.render('pages/yourpage.ejs', {
      pages: pages,
      session: req.session
    });
  });
});

app.post('/AddInterested/:event_id', function(req, res) {
  req.params.event_id()
})


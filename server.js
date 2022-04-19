//Import necessary node packages for the server
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
const session = require('express-session');
const res = require('express/lib/response');
app.use(express.static('./assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
var db;

//Setting up express sessions to work on cookies
app.use(session({
  secret: 'sekret nashych kompyuternych dush',
  resave: true,
  saveUninitialized: true
}));


//Connecting to MongoDB and setting up server
MongoClient.connect(process.env.uri, function (err, client) {
  if (err) throw err;
  db = client.db('Uglies');
  app.listen(8080);
  console.log("Running on 8080")
});

//Redirecting user to the correct index page
app.get('/', function (req, res) {
  res.render('pages/index.ejs', {    
    session: JSON.parse(JSON.stringify(req.session))
  });

});

//Redirecting user to the Login Page
app.get('/Login', function (req, res) {
  res.render('pages/login.ejs', {
    session: JSON.parse(JSON.stringify(req.session))
  });
});

//Redirecting user to the Your Page
app.get('/Yourpage', function (req, res) {
  res.render('pages/yourpage.ejs', {
    session: JSON.parse(JSON.stringify(req.session))
});
});

//Login code for users to log in into website
//Repurposed from the https://codeshack.io/basic-login-system-nodejs-express-mysql/
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute DBMongo query that'll select the account from the database based on the specified username and password
    db.collection('Logininfo').find({ "Username": username }).toArray(function (err, results) {
			// If there is an issue with the query, output the error
			if (err) throw error;
			// If the account exists
			if (results.length > 0) {
        if (results[0].Password === password){
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
        request.session.InterestedEvents = results[0].InterestedEvents
				// Redirect to home page
				response.redirect('/');
        }
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
      res.render('pages/events.ejs', {
          pages: pages,
          
          session: (JSON.stringify(req.session))
      });

  });
});

//Sending update request to MongoDB for the users interest in the specific event
//Updates the session as well
app.post('/updateEvent', function(req, res){
  var query = { Username: req.session.username };
  var newvalues = {
    $set: {
      InterestedEvents: req.body.newInt
    }
  }

  req.session.InterestedEvents = req.body.newInt;
    
  console.log(req.session.InterestedEvents)

  db.collection('Logininfo').updateOne(query, newvalues, function (err, result) {
    if (err) throw err;
    res.send("Success");
  });

})

//Sending update request to MongoDB to change the user's username
//Updates the session as well
app.post('/updateUsername', function(req, res){
  var query = { Username: req.session.username };
  var newvalues = {
    $set: {
      Username: req.body.newName
    }
  }

  req.session.username = req.body.newName;
    
  console.log(req.session.InterestedEvents)

  db.collection('Logininfo').updateOne(query, newvalues, function (err, result) {
    if (err) throw err;
    res.send("Success");
  });

})

//Adding new user to the MongoDB database
//Creates a session
app.post('/signUpUser', function(req, res){

  userInfo = {
    Username : req.body.Username,
    Password : req.body.Password,
    Admin : false,
    InterestedEvents : []
  }

  console.log(userInfo)

  db.collection('Logininfo').insertOne(userInfo, function(err, result){
    if (err) throw err;
    req.session.loggedin = true;
    req.session.username = userInfo.Username;
    req.session.InterestedEvents = userInfo.InterestedEvents
    res.redirect("/")
  })

});

//Deleting user from the MongoDB database and signs up from the website
//This code deletes user information from the session
app.post('/deleteUser', function(req, res){

  db.collection("Logininfo").deleteOne(req.body, function (err, obj) {
    if (err) throw err;
    signOut(req.session)
    res.redirect('/')
  });
});

//Signing out user from the website and redirects them to the Home Page
app.post('/signOut', function(req,res){
  signOut(req.session);
  res.redirect('/')
})

function signOut(sess) {
  if (sess.loggedin == true) {
    sess.loggedin = false;
    delete sess.username;
    delete sess.InterestedEvents;
  }
  console.log("Signed Out")
}

//Back-end API that will return list of events
app.get('/getEvents', function(req, res){
  db.collection('Events').find().toArray(function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})
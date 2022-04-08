const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017/";
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
const session = require('express-session');
app.use(express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
var db;
//module.exports = app;


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
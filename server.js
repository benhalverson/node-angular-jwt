'use strict';
var express = require('express');
var faker = require('faker');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var jwtSecret = 'thesecretis42';


var app = express();
var bodyParser = require('body-parser');
var user = {
  username: 'Ben',
  password: 'BH'
}
app.use(cors());
app.use(bodyParser.json());

app.get('/random-user', function(req, res){
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

app.post('/login', authenticate, function(req, res){
  var token = jwt.sign({
    username: username
  }, jwtSecret);
  res.send({
      token: token,
      user: user
  });
});

app.listen(3000, function(){
  console.log('App listening on localhost:3000');
});


//UTIL Functions

function authenticate(req, res, next) {
  var body = req.body;
  if(!body.username || !body.password) {
    res.status(400).end('Must provide username or password');
  }
  if (body.username !== user.username || body.password !== user.password) {
    res.status(401).end('Username or password incorrect');
  }
  next();
};

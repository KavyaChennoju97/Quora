//Libraries
var express = require('express');
var path = require('path');
const multer = require('multer');
const FormData = multer();
// App Instance
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

// Log requests to console
var morgan = require('morgan');

var passport = require('passport');

console.log("Initializing passport");
app.use(passport.initialize());

// Set up Database connection
// Bring in defined Passport Strategy
require('./config/passport')(passport);
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://kavya:kavya@cluster0-33gdb.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true , poolSize: 10 }, function(err) {
  if (err) throw err;
  else {
      console.log('Successfully connected to MongoDB');
  }
})
//server configuration
var basePath = '/quora';
var account_basepath = '/account';
var answer_basepath = '/answer';
var search_basepath = '/search';
var yourcontent_basepath = '/content'
var bookmarks_basepath = '/bookmarks';

//use express session to maintain session data
app.use(session({
  secret              : 'cmpe273',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000
}));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Log requests to console
app.use(morgan('dev'));

// Routes and Backend Funcioncalities
var followRoutes = require('./src/routes/followRoutes');
var Account = require('./src/routes/Account');
var profileRoutes = require('./src/routes/profile');
var questionRoutes = require('./src/routes/questionRoutes');
var messageRoutes = require('./src/routes/messageRoutes');
var Answer = require('./src/routes/Answer');
var Search = require('./src/routes/Search')
var YourContent = require('./src/routes/YourContent')
var graph =require('./src/routes/graph')
var Bookmarks = require('./src/routes/Bookmarks')

app.use(express.static('public'));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());


app.use(basePath, followRoutes);
app.use(basePath, graph);
app.use(account_basepath, Account);
app.use(basePath, profileRoutes);
app.use(basePath, questionRoutes);
app.use(answer_basepath, Answer);
app.use(search_basepath, Search);
app.use(yourcontent_basepath, YourContent);
app.use(basePath, messageRoutes);
app.use(bookmarks_basepath, Bookmarks);

app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

// Execute App
app.listen(3001, () => {
  console.log('Quora Backend running on Port:',3001);
});

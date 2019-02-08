var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var port = process.env.port || 4000; 

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (err) => {
	err ? console.log('Could not connect mongoose') : console.log('connected');
});

// require('./models/User');
// require('./module/passport');

var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(session({ 
	secret: 'jhdsgfksdfhdsjfhdkshfkjdsfmbds', 
	resave: true, 
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', apiRouter);

app.listen(port, () => console.log('Listening on port:',port))
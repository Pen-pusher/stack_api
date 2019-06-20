var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var port = process.env.port || 4000; 
var cors = require('cors');


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (err) => {
	err ? console.log('Could not connect mongoose') : console.log('connected');
});

require('./models/User');
require('./models/Question');
require('./models/Answer');
require('./models/Comment');
require('./models/tag');
require('./models/QuestionTag');

var apiRouter = require('./routes/api');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/api/v1', apiRouter);

app.listen(port, () => console.log('Listening on port:',port))
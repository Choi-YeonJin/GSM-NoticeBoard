var createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost:27017/Network', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var mongoose = require('mongoose');

var db = mongoose.connection;

db.once('open', function () {
  console.log("db서버에 연결되었습니다");
});
db.on("error",function (err) {
  console.log("DB ERROR :", err);
});

var studentSchema = mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: '123456789'
    },
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var server = app.listen(8000, function () {
  console.log("server on");
});

exports.UserLogin=function(id,pw,callback){
  if(!db) return;
  var login = db.collection('User').find({"id" : id, "password" : pw});
  login.toArray(function(err,docs){
    if(err){
      callback(err,null);
    }
    else if(docs){
      callback(null,docs);
    }
    else{
      callback(null,null);
    }
  }
  );
};
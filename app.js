var express = require('express');
var socket_io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var session = require('express-session');

var studentController = require('./database/controllers').student;

//Require router
var route_user  = require('./routes/route_user');
var index = require('./routes/index');

var app = express();

//Socket io
var io = socket_io();
app.io = io;

//Natural language processor
var connection = require('./controller/nlp')(io);

//Dateformat
var dateFormat = require('dateformat');

//Action response
// var speech_response = require('./config/action_response')(io,speech);


// view engine setup
// view engine setup
app.engine('hbs', hbs({extname: 'hbs',
                       defaultLayout: 'admin_layout',
                       layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true }));

var sess;

app.use('/', index);
app.use('/', route_user);



app.post('/masuk', function(req, res){
  sess = req.session;
  var student_id = req.body.uid;
  var password = req.body.password;
  sess.uid = req.body.uid;
  if(student_id=="" && password=="")
  {
    var string = encodeURIComponent('Complete the fields');
    res.redirect('/login?text=' + string)
  }


  if(isNaN(student_id))
  {
    var string = encodeURIComponent('ID is not a number');
    res.redirect('/login?text=' + string)
    console.log(isNaN(student_id))
  }
  else
  {
    studentController.getPassword(student_id)
    .then((pass) => {
      if(pass)
      {
        if(pass.password==password)
        {
          //res.render('chat_bodies/chat', { layout: 'user_layout' , name: sess.email });
          //console.log("id is " + sess.email+ " pass is " + pass.password);
          res.redirect('/');
        }
        else
        {
          var string = encodeURIComponent('ID or password is invalid');
          res.redirect('/login?text=' + string);
          console.log("ID or password is invalid");
        }    
      }
      else
      {
        var string = encodeURIComponent('ID or password is invalid');
        res.redirect('/login?text=' + string);
        console.log("ID or password is invalid");
      }      
    })
  } 
  
});

app.post('/chpass', function(req, res){
  sess = req.session;

  var uid = sess.uid;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;
  studentController.getPassword(uid)
  .then((pass) =>
  {
    if(pass.password==oldPassword && newPassword==confirmPassword)
    {
      studentController.chpass(uid, newPassword)
      res.redirect('/login');
    }
    else
    {
      res.render('chat_bodies/password', { layout: 'user_layout', text: "Wrong Password" });
      console.log("invalid")
    }
  })

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

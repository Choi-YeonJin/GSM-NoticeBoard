var express = require('express');
var router = express.Router();
var model=require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('index');
});

router.get('/home', function (req, res, next) {
  res.render('home');
});

router.post('/login', function (req, res) {
  console.log(`post in`);
  model.UserLogin(req.body.userName,req.body.userPassword,function(err,docs){
    if(err){
      console.log(err);
    }
    else if(docs.length>0){
      console.log('login suceess');
      res.redirect('/home');
    }
    else{
      res.redirect('/login');
    }
  });
});

module.exports = router;

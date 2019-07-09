var express = require('express');
    router = express.Router(),
    crypto = require('crypto'),
    model = require('../models/db');
    
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'index', session: req.session.data, message });
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'home',session: req.session.data });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  console.log("session destroy 성공");
  console.log("logout");
  res.redirect('/');
});

router.get('/mypage', function (req, res, next) {
  console.log(`mypage button sucess`);
  res.render('change_pw', { title: 'mypage',session: req.session });
});
var message;
router.post('/login', function (req, res) {
  console.log(`post in`);
  model.UserLogin(req.body.userName, req.body.userPassword, function (err, docs) {
    if (err) {                     
      console.log(err);
    }
    else if (docs.length > 0) {
      console.log('login suceess');
      req.session.data = docs;
      console.log('session suceess');
      res.redirect('/home');
    }
    else {
      console.log('login error');
      res.render('index', { title: 'index', message:1 });
    }
  });
});

router.post('/change_pw', function (req, res, next) {

  console.log(`button sucess`);
  res.redirect('/');
});

module.exports = router;
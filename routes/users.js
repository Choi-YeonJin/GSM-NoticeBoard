var express = require('express');
    router = express.Router(),
    crypto = require('crypto'),
    model = require('../models/db');
    
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'home' });
});

router.post('/login', function (req, res) {
  console.log(`post in`);
  model.UserLogin(req.body.userName, req.body.userPassword, function (err, docs) {
    if (err) {                     
      console.log(err);
    }
    else if (docs.length > 0) {
      console.log('login suceess');
      res.redirect('/home');
    }
    else {
      console.log('login error')
      res.redirect('/login');
    }
  });
});

module.exports = router;
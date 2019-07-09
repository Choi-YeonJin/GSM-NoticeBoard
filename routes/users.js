var express = require('express');
    router = express.Router(),
    crypto = require('crypto'),
    model = require('../models/db');
    
/* GET users listing. */
router.get('/', function (req, res, next) {
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'home',session: req.session.data });
});

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
      console.log(docs[0]['name']);
      console.log('login suceess');
      res.redirect('/home');
    }
    else {
      console.log('login error');
      res.render('index', { title: 'index', message:1 });
    }
  });
});
  res.redirect('/');
});

module.exports = router;
var UserID = null,
  UserName = null,
  UserPW = null;

var express = require('express');
router = express.Router(),
  crypto = require('crypto'),
  model = require('../models/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.UserLogin) {
    res.render('logout', { id: req.session.data[0].id });
  } else {
    res.render('index', { title: 'index', session: req.session.data, message });
  }
});

router.get('/home', function (req, res, next) {
  if (req.session.isLogin) {
    res.render('home', { title: 'home', name: UserName });
  } else {
    res.send('Login errer');
  }
});

router.get('/mypage', function (req, res, next) {
  console.log(`mypage button sucess`);
  if (req.session.isLogin) {
    res.render('change_pw', { title: 'mypage', session: req.session, message });
  } else {
    res.send('login error');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

var message;
router.post('/login', function (req, res) {
  console.log(`post in`);
  model.UserLogin(req.body.id, req.body.userPassword, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else if (docs.length > 0) {
      console.log(docs[0]['name']);
      console.log('login suceess');
      req.session.isLogin = true;
      req.session.userinfo = docs[0].name;
      UserID = docs[0].id;
      UserName = docs[0].name;
      console.log(UserName);
      console.log('session suceess');
      res.render('home', { title: 'home', name: docs[0].name,subject:'제목',content:'내용' });
    }
    else {
      console.log('login error');
      res.render('index', { title: 'index', message: 1 });
    }
  });
});


router.post('/change_pw', function (req, res, next) {
  console.log(`change_pw button OK`);
  model.ChangePassword(UserID, req.body.현재비밀번호, req.body.변경비밀번호, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else if (docs.length > 0) {
      console.log('pw 변경');
      res.redirect('/');
    }
    else {
      console.log('비밀번호 틀림');
      res.render('change_pw', { title: 'change_pw', message: 1 });
    }
  });
});

router.post('/change_name', function (req, res, next) {
  console.log(`change name button OK`);
  console.log(req.body.rename);
  model.ChangeName(UserID, UserName, req.body.rename, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else if (docs.length > 0) {
      console.log('name 변경 OK');
      res.redirect('/logout');
    }
    else {
      console.log('err');
      res.redirect('/logout');
    }
  });
});

module.exports = router;

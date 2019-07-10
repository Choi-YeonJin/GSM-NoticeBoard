var UserID = null;

var express = require('express');
    router = express.Router(),
    crypto = require('crypto'),
    model = require('../models/db');
    
/* GET users listing. */
router.get('/', function (req, res, next) {
  if(req.session.UserLogin){
    res.render('logout',{id:req.session.data[0].id});
  }else{
    res.render('index',{ title: 'index', session: req.session.data, message });
  }
});

router.get('/home', function (req, res, next) {
  if(req.session.isLogin){
    res.render('home', { title: 'home',session: req.session.data });
  }else{
    res.send('Login errer');
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  console.log("session destroy 성공");
  console.log("logout");
  res.redirect('/');
});

router.get('/mypage', function (req, res, next) {
  console.log(`mypage button sucess`);
  res.render('change_pw', { title: 'mypage',session: req.session, message });
});

router.post('/register', (req, res) => {
  let uid = req.body.user_id;
  let upwd = req.body.password;
  duplicate(req, res, uid, upwd);
});

router.post('/', (req, res) => {
  let uid = req.body.user_id;
  let upwd = req.body.password;
  duplicate(req, res, uid, upwd);
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
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
      req.session.isLogin = true;
      UserID = docs[0].id;
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
  model.ChangePassword(UserID,req.body.현재비밀번호,req.body.변경비밀번호, function (err, docs) {
    if (err) {                     
      console.log(err);
    }
    else if (docs.length > 0) {
      console.log('pw 변경');
      res.redirect('/');
    }
    else {
      console.log('비밀번호 틀림');
      res.render('change_pw', { title: 'change_pw', message:1 });
    }
  });
});

module.exports = router;
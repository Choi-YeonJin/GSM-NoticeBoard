var express = require('express');
var router = express.Router();
model = require('../models/db');
user = require('./users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Express'});
});

router.get('/post', function (req, res, next) {
  res.render('post',{ title: 'post'});
});

router.post('/post', function (req, res) {
  console.log(req.body.title, req.body.content)
  model.Insertboard(req.body.title, req.body.content, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else if (docs.length > 0) {
      console.log('post suceess');
      console.log(req.session.userinfo);
      res.render('home', { title: 'home', subject:req.body.title,content:req.body.content,name:req.session.userinfo });
    }
    else {
      console.log('post error');
      console.log(req.session.userinfo);
      res.render('home', { title: 'home', subject:req.body.title,content:req.body.content,name:req.session.userinfo });
    }
  });
});

module.exports = router; 
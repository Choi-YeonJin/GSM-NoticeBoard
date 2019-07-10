var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', board: board });
});

router.get('/board', function (req, res, next) {
  res.render('board', { title: 'index', session: req.session.data });
});

module.exports = router; 
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express',session: req.session });
  console.log("OK")
});

module.exports = router;
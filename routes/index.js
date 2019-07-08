var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express',session: req.session });
  console.log("OK")
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  console.log("session destroy 성공");
  console.log("logout");
  res.redirect('/');
});



// router.get('/change_pw', function (req, res, next) {
//   res.render('change_pw', { title: 'change_pw',session: req.session });
// });

// router.get('/logout', function(req,res,next){
//   sess = req.session;
//         if(sess.username){
//             req.session.destroy(function(err){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     res.redirect('/');
//                 }
//             })
//         }else{
//             res.redirect('/');
//         }
// })

// router.post('/change_pw',function(req,res,next){
//     console.log(`mypage button sucess`);
//     res.redirect('/change_pw');
// })
module.exports = router;
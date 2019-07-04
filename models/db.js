const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Network', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.once('open', function () {
  console.log("db서버에 연결되었습니다");
});
db.on("error", function (err) {
  console.log("DB ERROR :", err);
});

exports.UserLogin = function (id, pw, callback) {
    if (!db) return;
    var login = db.collection('User ').find({ "id": id, "password": pw });
    login.toArray(function (err, docs) {
      if (err) {
        callback(err, null);
      }
      else if (docs) {
        callback(null, docs);
      }
      else {
        callback(null, null);
      }
    }
    );
  };
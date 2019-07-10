const mongoose = require('mongoose');
var crypto = require('crypto');

mongoose.connect('mongodb://localhost:27017/Network', { useNewUrlParser: true, autoIndex:false });
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
  var shasum = crypto.createHash('sha256');
  shasum.update(pw);
  //shasum.end();
  var hashpw = shasum.digest('hex');
  var login = db.collection('User').find({ "id": id, "password": hashpw });

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

exports.ChangePassword = function (id, pw, repw, callback) {
  if (!db) return;
  var shasum = crypto.createHash('sha256');
  shasum.update(pw);
  var hashpw = shasum.digest('hex');
  var repassword = db.collection('User').find({ "id": id, "password": hashpw });
  repassword.toArray(function (err, docs) {
    if (err) {
      callback(err, null);
    }
    else if (docs) {
      var shasum1 = crypto.createHash('sha256');
      shasum1.update(repw);
      var rehashpw = shasum1.digest('hex');
      db.collection('User').update({ 'id': id, 'password': hashpw },
        { $set: { 'id': id, 'password': rehashpw } });
      callback(null, docs);
    }
    else {
      callback(null, null);
    }
  }
  );
}

exports.ChangeName = function (id, name, rename, callback) {
  if (!db) return;
  var name = db.collection('User').findOne({ "id": id, "name": name }, function (err, docs) {
    if (err) {
      callback(err, null);
    }
    else if (docs) {
      db.collection('User').updateOne({ 'id': id }
      ,{ $set: {'name': rename } }).then(err => {
        if (err) callback(err, null);
        callback(null, docs);
      });
    }
    else {
      callback(null, null);
    }
  }
  );
}

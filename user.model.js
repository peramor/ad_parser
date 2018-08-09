var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/adblock');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, dropDups: true },
  updated: { type: Date, default: Date.now },
  domains: [String],
  history: [{
    domain: { type: String, unique: true, required: true, dropDups: true },
    date: { type: Date, default: Date.now }
  }]
});

var User = mongoose.model('User', userSchema);

// тестовый пользователь

let user = new User({
  email: 'per.amor.maltsev@gmail.com',
  domains: [
    "rotator.i-pic.ru",
    "rubicom.xyz",
    "ruclicks.com",
    "russia-shop24.ru",
    "rutorad.ru",
    "rutorads.com",
    "ruttwind.com",
    "rutvind.com",
    "sapmedia.ru",
    "sds012.xyz",
    "sds112.xyz",
    "sdsd11.ru",
    "senokoss.biz",
    "senokoss.net",
    "shakescash.com",
    "shakesclick.com",
    "shakesin.com",
    "shakespoint.com"
  ]
})

user.save(err => {
  if (err.code == 11000) // duplicate
    return;
  console.error(err)
})

module.exports = User;
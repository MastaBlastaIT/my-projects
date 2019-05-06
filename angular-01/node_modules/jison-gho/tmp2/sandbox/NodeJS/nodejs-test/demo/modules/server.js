// module.exports = exports = this

var User = require('./user');
var db = require('./db');
var log = require('./logger')(module);

db.connect();  // module caching: each require(file runs only once, init is required only once, and db is global

function run() {
    var vasya = new User("vasya");
    var petya = new User("petya");

    vasya.sayHi(petya);
    log(db.getPhrase("Hello"));
}


if(module.parent) {  // launched as a module
    exports.run = run;
} else {  // launched from cmd
    run();
}
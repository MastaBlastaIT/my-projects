var db = require('../db/index');
var log = require('../logger')(module);  // module-fabric

function User(name) {
    this.name = name;
    this.sayHi = function(peer) {
        log(name + ': ' + db.getPhrase('Hello') + ', ' + peer.name + "!");
    }
}

module.exports = User;
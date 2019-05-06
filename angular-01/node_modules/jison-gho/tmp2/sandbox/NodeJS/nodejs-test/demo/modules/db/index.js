var phrases;

exports.connect = function() {
    phrases = require('./ru');  // JSON module
}

exports.getPhrase = function(name) {
    if (!phrases[name]) {
        throw new Error("No such phrase: " + name);
    }
    return phrases[name];
}
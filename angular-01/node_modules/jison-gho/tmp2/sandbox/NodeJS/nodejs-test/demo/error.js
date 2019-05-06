var util = require('util');
var http = require('http');

var phrases = {
    "Hello": "Привет",
    "world": "мир"
};


// -------------
// Error classes
// message name stack
function PhraseError(message) {
    this.message = message;

    // if(Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);  // V8: print stack trace until call of this.constructor func
    // } else {
    //     this.stack = (new Error()).stack;  // prints current stack trace
    // }
}
util.inherits(PhraseError, Error);  // sets prototype.constructor properly
PhraseError.prototype.name = 'PhraseError';  // error name: need to add explicitly

function HttpError(status, message) {
    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "";

    Error.captureStackTrace(this, HttpError);

}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

// -------------
// Functionality

function getPhrase(name) {
    if(!phrases[name]) {
        throw new PhraseError("No such phrase: " + name);  // HTTP 500, notification!
    }
    return phrases[name];
}

function makePage(url) {
    if (url != 'index.html') {
        throw new HttpError(404, "No such page");  // HTTP 404
    }
    return util.format("%s, %s!", getPhrase("Helo"), getPhrase("world"));
}

// ---------
// Execution
try {
    var page = makePage('index.html');
    console.log(page);
} catch(e) {
    if(e instanceof HttpError) {
        console.log(e.status, e.message);
    } else {
        console.error("Error %s\nMessage: %s\nStack: %s", e.name, e.message, e.stack);
    }
}
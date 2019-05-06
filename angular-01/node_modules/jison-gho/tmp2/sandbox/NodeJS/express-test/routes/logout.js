var config = require('../config');
// var cookieEncrypter = require('cookie-encrypter');  // sending encrypted cookie in a message
var sessionStore = require('../libs/sessionStore').sessionStore;


module.exports = function (req, res, next) {
    var sid = req.session.id;
    var io = req.app.get('io');

    req.session.destroy(function (err) {
        // io.emit("sessreload", {
        //     sidEncrypted: cookieEncrypter.encryptCookie(sid, {key: config.get('session:secret')})
        // });

        sessionStore.updateIOSessionData(io, sid);

        if (err) return next(err);
        res.redirect('/');
    });
};
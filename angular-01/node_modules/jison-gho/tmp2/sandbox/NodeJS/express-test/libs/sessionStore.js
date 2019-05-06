var session = require('express-session');
var mongoose = require('../libs').mongoose;
var MongoStore = require('connect-mongo')(session);  // use options from mongoose
var log = require('../libs').logger(module);
var User = require("../models/user").User;
var async = require('async');

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});


sessionStore.loadSession = function (sid, callback) {
    // connect-mongo's load does not follow async style:
    // callback(null, session) - ok
    // callback(null, null) - no session <-- load() would call callback as callback(), which is not async style
    // callback(err) - error
    sessionStore.load(sid, function (err, session) {
        if (arguments.length == 0) {  // no arguments => no session
            return callback(null, null);
        } else {
            return callback(err, session);
        }
    });
};

sessionStore.loadUser = function (session, callback) {
    if (!session.user) {
        log.debug("Session %s is anonymous", session.id);
        return callback(null, null);
    }

    log.debug("Retrieving user: ", session.user);
    User.findById(session.user, function (err, user) {
        if (err) return callback(err);
        if (!user) return callback(null, null);
        log.debug("user findById result: user.username = " + user.username);
        callback(null, user);
    });
};

/**
 *  Finds socket with socket.handshake.session.id == sid and reloads the session.
 */
sessionStore.updateIOSessionData = function (io, sid) {
    async.each(io.sockets.sockets, function (client, callback) {
        if (client.handshake.session.id != sid) return;
        sessionStore.loadSession(sid, function (err, session) {
            if (err) return callback(err, client);
            if (!session) {
                client.emit("logout");
                client.disconnect();
                return;
            }

            client.handshake.session = session;
        })
    }, function(err, client) {
        if(err === null) return;  // no clients connected
        client.emit("error", {message: "server error: " + err});
        client.disconnect();
    });
};


exports.sessionStore = sessionStore;

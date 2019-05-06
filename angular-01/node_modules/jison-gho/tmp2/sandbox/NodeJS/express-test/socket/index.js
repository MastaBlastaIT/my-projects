var log = require('../libs').logger(module);
var Server = require('socket.io');
var config = require('../config');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
// var cookieEncrypter = require('cookie-encrypter');  // sending encrypted cookie in a message
var HttpError = require("../errors").HttpError;
var sessionStore = require('../libs/sessionStore').sessionStore;
var async = require('async');

module.exports = function (server) {
    var io = new Server(server, {
        origins: 'localhost:3000'
    });  // to not baffle WebStorm's auto-complete

    io.use(function (socket, next) {  // authentication
        async.waterfall([function (cb) {  // get session
            // saves user and session to socket.handshake to access upon connection
            var sidSigned = cookie.parse(socket.request.headers.cookie)[config.get("session:key")];
            var sid = cookieParser.signedCookie(sidSigned, config.get("session:secret"));
            socket.handshake.sid = sid;
            sessionStore.loadSession(sid, cb);

        }, function (session, cb) {
            if (!session) return cb(new HttpError(401, "No session"));
            socket.handshake.session = session;
            sessionStore.loadUser(session, cb);

        }, function (user, cb) {
            if (!user) return cb(new HttpError(403, "Anonymous session may not be correct."));
            socket.handshake.user = user;
            cb(null, user);

        }], function (err) {
            if (err) return next(err);
            next();
        });

    });

    // io.on('sessreload', function (data) {  // internal event (from server side)
    //     var sid = cookieEncrypter.decryptCookie(data.sidEncrypted, {key: config.get('session:secret')});
    //     sessionStore.updateIOSessionData(io, sid);
    // });

    io.on('connection', function (socket) {  // socket is for concrete client
        var username = socket.handshake.user.username;
        log.info('User %s is connected.', username);
        // socket.request.headers.cookie
        socket.broadcast.emit('join', {username: username});
        socket.emit('session:data', {username: socket.handshake.user.username}); // send session data to the connected client

        socket.on('message_client', function (data, cb) {
            log.info("Data received via socket.io [User: message]. %s : %s.", username, data.message);
            var dataWithUser = Object.assign(data, {username: username});
            socket.broadcast.emit('message_server', dataWithUser); // data = { message: "chat message" }
            cb(dataWithUser);  // current user should also receive a message
        });

        socket.on('disconnect', function (data, cb) {
            socket.broadcast.emit('leave', {username: socket.handshake.user.username});
        });
    });

    return io;
};

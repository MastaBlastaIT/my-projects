var async = require('async');
var errors = require("../errors/index.js");
var User = require('../models/user').User;


exports.get = function (req, res) {
    res.render('login');
};

exports.post = function (req, res, next) {
    var username = req.body.username;  // thanks to bodyParser
    var password = req.body.pwd;

    User.authenticate(username, password, function (err, user) {
        if (err) {
            if (err instanceof errors.AuthError) {
                return next(403);
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.redirect('/');
    });


};
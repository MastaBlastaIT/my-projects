// loads user name into req
var User = require('../models/user').User;

module.exports = function (req, res, next) {
    if (!req.session.user) {
        res.locals.user = req.user = null;
        return next();
    }

    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);
        res.locals.user = req.user = user;  // user will be available in all the templates
        next();
    });

};
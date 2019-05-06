var errors = require('../errors');

module.exports = function (req, res, next) {
    if (!req.session.user) {
        return next(new errors.HttpError(401));
    }

    next();
};
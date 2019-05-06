/**
 * Increases the hit counter for the user and stores as a session variable numberOfVisits.
 */
module.exports = function (req, res, next) {
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;  // saving info to session
    next();
};
var express = require('express');
var router = express.Router();

var User = require('../models/user').User;
var checkAuth = require('../middleware/checkAuth');  // middleware to check that user is authenticated

// middleware and route handlers specific to the router
router.use(checkAuth);  // this route requires user to be authenticated

router.get('/', function(req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    })
});

router.get('/:id', function (req, res, next) {
    try {
        var id = new ObjectID(req.params.id);  // req.params.id is instance of ObjectID; throws exception for too short IDs
    } catch (e) {
        return next(404);
    }
    User.findById({_id: id}, function (err, user) {
        if (err) next(err);
        if (!user) next(404);

        res.json(user);
    });
});

module.exports = router;
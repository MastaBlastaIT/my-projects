var express = require('express');
var router = express.Router();

var User = require('../models/user').User;
var checkAuth = require('../middleware/checkAuth');  // middleware to check that user is authenticated

// middleware and route handlers specific to the router
router.use(checkAuth);  // this route requires user to be authenticated

router.get('/', function(req, res) {
    res.render('chat');
});


module.exports = router;
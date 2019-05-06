var log = require('../libs').logger(module);
var User = require('../models/user').User;

User.remove({username: "test"}, function (err) {
    if (err) {
        log.error(err);
    }
    var user = new User({
        username: 'test',
        password: 'maddog'
    });
    user.save(function (err) {
        if (err) {
            log.error("Failed to create the user: %s.", user.username);
            log.error(err);
        }
        User.findOne({username: "test"}, function (err, obj) {
            console.log(obj);
            console.log("Checking password: ", user.checkPassword(user.password));
        });
    });
});
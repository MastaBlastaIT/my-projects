var users = require('./users');
var chat = require('./chat');

module.exports = function (app) {
    app.get('/', require('../middleware/hitCounter'), function (req, res) {  // post, delete, put, ...
        res.render("index", {footer: "The number of hits in current session: " + req.session.numberOfVisits});
    })
        .get('/login', require('./login').get)
        .post('/login', require('./login').post)
        .post('/logout', require('./logout'));

    app.use('/users', users);
    app.use('/chat', chat);
};

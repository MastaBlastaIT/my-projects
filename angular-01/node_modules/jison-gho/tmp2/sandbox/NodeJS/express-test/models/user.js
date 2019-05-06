var crypto = require('crypto');
var async = require('async');
var errors = require('../errors');

var mongoose = require('../libs').mongoose,
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,  // username, background: true
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');  // sha1(salt+password)
};

schema.virtual('password')  // virtual fields are not saved to database
// user.password can be defined using setter-getter, e.g. user.get('password') and user.set('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {  // methods -> user.checkpassword
    return this.encryptPassword(password) == this.hashedPassword;
};

schema.statics.authenticate = function (username, password, callback) {  // statics -> User.authenticate
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);  // existing user
                } else {
                    callback(new errors.AuthError("Password incorrect"));
                }
            } else {
                var user = new User({username: username, password: password});
                user.save(function (err) {
                    if (err) return callback(err);
                    callback(null, user);
                });
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', schema);
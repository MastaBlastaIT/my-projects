var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'));
if (process.env.NODE_ENV == 'development') {
    mongoose.set('debug', true);
}

module.exports = mongoose;
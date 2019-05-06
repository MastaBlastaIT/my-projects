/**
 * Returns wrapper around winston logger with specific logger settings based on request's path and environment settings.
 */

var winston = require('winston');
var fs = require('fs');
var ENV = process.env.NODE_ENV;  // app.get('env')

function makeLogger(module) {
    var filename = module.filename.split('\\').slice(-2).join('\\');
    if (!fs.existsSync('logs')) {  // only at init, so ok to use sync
        fs.mkdirSync('logs');
    }

    var transports = [
        new winston.transports.Console({
            timestamp: timestamp,
            colorize: true,
            level: ENV == 'development' ? 'debug' : 'error',
            label: filename
        }),
        new winston.transports.File({
            filename: 'logs/debug.log',
            level: 'debug',
            label: filename
        })
    ];

    return new winston.Logger({
        transports: transports
    });

    function timestamp() {
        var date = new Date();
        return date.toLocaleString("en");
    }
}


module.exports = makeLogger;
// Usage:
// var log = require('./libs/logger')(module);
// log.debug, log.info, log.error
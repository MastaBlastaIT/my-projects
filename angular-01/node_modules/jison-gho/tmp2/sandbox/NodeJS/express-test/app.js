var express = require('express');
var path = require('path');
var config = require('./config');
var log = require('./libs').logger(module);
var errors = require('./errors');

var favicon = require('serve-favicon');
var bodyParser = require('body-parser'); // handles application/json, application/x-www-form-urlencoded, text-plain, raw
var upload = require('multer')({dest: config.get('multer:dest')}); // handles multipart/form-data, use in specific request handlers
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var session = require('express-session');
var methodOverride = require('method-override');
var morgan = require('morgan'); // express request logger

var sessionStore = require('./libs/sessionStore').sessionStore;  // use options from mongoose
var app = express();

var server = require('http').createServer(app);
var io = require('./socket')(server);
app.set('io', io);  // application global
// app.locals.io = io;

// Templating Engine
app.engine('ejs', require('ejs-locals')); // *.ejs to be handled by ejs-locals. Adds: layout partial block.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares (handlers w/ next callback)
// In Express 3, built-in middlewares came from connect framework: http://www.senchalabs.org/connect/.
// In Express 4+, they come as separate npm modules.
if (app.get('env') == 'development') {  // logs requests
    app.use(morgan('dev', {/*immediate: true*/}));  // by default (immediate: false), overrides res.end
} else {
    app.use(morgan('default'));
}
// app.use(favicon(path.join(__dirname, '/webapp/favicon.ico')));  // /favicon.ico
app.use(bodyParser.json())  // application/json -> req.body
    .use(bodyParser.urlencoded({extended: true}))  // urlencoded -> req.body
    .use(methodOverride())
    .use(cookieParser())  // req.headers --> req.cookies
    .use(session({
        resave: config.get('session:resave'),
        saveUninitialized: config.get('session:saveUninitialized'),
        secret: config.get('session:secret'),  // ABC6314764613858791365.SHA256(secret+salt) -- cookie.sig
            // sig is used for stamping user data saved in cookies, e.g. points: 1000.SHA256(secret+salt)
        key: config.get('session:key'),
        cookie: config.get('session:cookie'),
        store: sessionStore  // session storage using connect-mongodb module
    }))
    .use(require('./middleware/sendHttpError'))
    .use(require('./middleware/loadUser'));

// Routing
require('./routes')(app);

app.use('/static', express.static(path.join(__dirname, 'webapp')));

// Global error handler
app.use(function (err, req, res, next) {  // middleware for errors, fires on next(Error) or throw
    if (typeof err == 'number') {  // next(400)
        err = new errors.HttpError(err);
    }

    if (err instanceof errors.HttpError) {
        res.sendHttpError(err);
    } else if ('development' == app.get('env')) {
        next(err);
    } else {   // NODE_ENV == 'production'
        log.error(err);
        err = new errors.HttpError(500);
        res.sendHttpError(err);
    }
});

if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// Start server
server.listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});
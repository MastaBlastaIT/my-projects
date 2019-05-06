/** Usage:
 * var mongoose = require('./libs').mongoose;
 * var logger = require('./libs').logger(module)
 *
 * This is required to fix auto-completion in WebStorm IDE.
 * Simply hooking var mongoose = require('./libs/mongoose'); breaks auto-completion
 *
 * Another work-around is to import var mongoose = require('./libs/mongoose').mongoose,
 * but then mongoose.js module should use exports.mongoose = mongoose.
 */

exports.mongoose = require('./mongoose');
exports.logger = require('./logger');
exports.sessionStore = require('./sessionStore').sessionStore;

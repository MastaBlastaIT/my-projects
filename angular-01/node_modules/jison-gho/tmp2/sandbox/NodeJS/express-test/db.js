/**
 * This is the script for cleaning the database and initializing it with some pre-defined values.
 * Run $ node db.js
 */

var mongoose = require('./libs').mongoose;
var async = require('async');
// 1. drop database
// 2. create & save 3 users
// 3. close connection

async.series([
    open,
    dropDb,
    requireModels,
    createUsers
], function (err, results) {
    if (err) console.error(err);
    console.log("Return values = [ ...callback(null, result) ]:\n", results);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);  // Callback style is necessary, otherwise mongoose will not have connected
}

function dropDb(callback) {
    // console.log(mongoose.connection.readyState);  // 2 - connecting, 1 - connected
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user');  // builds index (async)

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback)
}

function createUsers(callback) {
    var userDatas = [
        {username: 'Вася', password: "test123"},
        {username: 'Петя', password: "123"},
        {username: 'admin', password: "maddog"}
    ];

    // Keeps a result, i.e. callback(err, results), where results stores the changed collection
    async.map(userDatas, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
    // Could use async.each, but it does not keep a result, i.e. calls callback(err)
    // async.each(userDatas, function (userData, callback) {
    //     var user = new mongoose.models.User(userData);
    //     user.save(callback);
    // }, callback);
}


// -------------------------
// Refactored from this code
// -------------------------
// mongoose.connection.on('open', function(err) {  // Callback style is necessary, otherwise mongoose will not have connected
//     // to the database before we will execute the db.dropDatabase(...)
//     console.log(mongoose.connection.readyState);  // 2 - connecting, 1 - connected
//     var db = mongoose.connection.db;
//     db.dropDatabase(function (err) {
//         if (err) throw err;
//
//         async.parallel([
//             function(callback) {
//                 var vasya = new User({username: 'Вася', password: "test123"});
//                 vasya.save(function (err, savedUser) {
//                     if (err) callback(err);
//                     callback(null, savedUser);
//                 });
//             },
//             function(callback) {
//                 var petya = new User({username: 'Петя', password: "123"});
//                 petya.save(function (err, savedUser) {
//                     if (err) callback(err);
//                     callback(null, savedUser);
//                 });
//             },
//             function(callback) {
//                 var admin = new User({username: 'admin', password: "maddog"});
//                 admin.save(function (err, savedUser) {
//                     if (err) callback(err);
//                     callback(null, savedUser);
//                 });
//             }
//         ], function(err, results) {
//             console.log(arguments);
//             mongoose.disconnect();
//         });
//
//     });
//
// });
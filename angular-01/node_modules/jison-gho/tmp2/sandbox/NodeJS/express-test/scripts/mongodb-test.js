var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/chat';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to chat mongodb database");
    var collection = db.collection('test_insert');  // connect to existing or create new collection
    collection.deleteMany({a: 2}, function (err, docs) {
        collection.insertOne({a: 2}, function (err, docs) {
            collection.count(function (err, count) {
                console.log("count = %d", count);
            });

            // Locate all the entries using find
            var cursor = collection.find();
            cursor.toArray(function (err, results) {  // read all data to array
                console.dir(results);
                db.close();
            });
        });
    });

});
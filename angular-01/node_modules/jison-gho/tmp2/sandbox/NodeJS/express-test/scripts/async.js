var async = require('async');

var MAX = 5;  // 1 + ... + 5 (= 15)
var collection = [1, 2, 3];

function calculationSync(num, max) {  // num + ... + max
    console.log(num);
    var res = 0;
    for (var i = num; i < max; i++) {
        res += i;
    }
    return res;
}

function iterateeSync(el, callback) {  // sync iteratee (handler) - order of operations on collection is kept
    callback(null, calculationSync(el, MAX));
}

function iteratee(el, callback) {  // async iteratee - order of operations on collection is not guaranteed
    var sum = 0;
    var delta = Math.max(Math.round(MAX / 100), 1);
    setImmediate(function run() {
        sum += calculationSync(el, Math.min(el + delta, MAX));
        el = el + delta;
        if (el < MAX) {
            setImmediate(run);
        } else {
            callback(null, sum);
        }
    });
}

function callback(err, result) {
    if (err) {
        console.error(err);
        return
    }
    console.log(result);
}

async.map(collection, iteratee, callback);
//async.map(collection, iterateeSync, callback);


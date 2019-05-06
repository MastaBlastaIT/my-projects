var fs = require('fs');

fs.open(__filename, "r", function(err, file) {
   console.log("I/O");
});

setImmediate(function() {
    console.log('setImmediate');
    setImmediate(function() {
        console.log('setImmediate 2');
    });
});

process.nextTick(function() {
   console.log('nextTick');
});


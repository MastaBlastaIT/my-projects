var fs = require('fs');

var stream = new fs.ReadStream(__filename, {encoding: 'utf-8'});

stream.on('readable', function() {
    var data = stream.read();  // returns null before emitting "end", new data: end of stream
    if(data) console.log(data);  // needs .toString() if encoding is not specified

});

stream.on('end', function() {
    console.log("END");
});

stream.on('error', function(e) {
    if(e.code == 'ENOENT') {
        console.log('File not found.');
    } else {
        console.error(e);
    }
});
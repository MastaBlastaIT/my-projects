var EventEmitter = require('events').EventEmitter;

var db = new EventEmitter();  // data source
db.setMaxListeners(0);

function Request() {
    var self = this;
    this.bigData = new Array(1e6).join('*');

    this.send = function(data) {
        console.log(data);
    };

    this.onError = function() {
        self.send("Houston, we have a problem.")
    };

    function onData(info) {
        self.send(info);
    }

    this.end = function() {
      db.removeListener('data', onData);  // preventing memory leak
    };

    db.on('data', onData);  // onData handler gets into the props of db object with its closure! db.emit
}

setInterval(function() {  // create new object each 200 ms
    var request = new Request();
    //...
    request.end();
    console.log(process.memoryUsage().heapUsed);  // also see: heapdump module
    //console.log(db);
}, 200);

var http = require('http');
var url = require('url');
var fs = require('fs');

var server = new http.Server();  // http.Server -> net.Server -> EventEmitter
    // emits 'request'; same as http.createServer([requestListener]).listen([port]])

// change emit function to log all events
var emit = server.emit;
server.emit = function(event) {
    console.log(event);
    emit.apply(this, arguments);
};

// Keep-alive: only request events after some tries (server sends a corresponding HTTP header)

server.on('request', function(req, res) {
    var parsedUrl = url.parse(req.url, true);

    if(req.method=='GET' && parsedUrl.pathname=='/echo') {  // /echo?message=hello -> hello
        require('./echo')(parsedUrl, res);
    } else if(parsedUrl.pathname=='/chat') {
        require('./chat-server')(req, res);
    } else {  // static server: /index.html -> returns index.html with proper MIME headers
        require('./serve-static')(req, res);
    }
}).listen(8080, '127.0.0.1');


setTimeout(function() {
    server.close(function() {
        //process.exit();
        clearInterval(timer);  // alternatively, use timer.unref(); for timer
    });
}, 30*60*1000);  // stop in 30 minutes

var timer = setInterval(function() {
    console.log(process.memoryUsage());
}, 60*1000);  // print memory usage each minute
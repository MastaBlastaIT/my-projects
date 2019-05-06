var EventEmitter = require('events').EventEmitter;
var server = new EventEmitter();

// Event handlers are called sequentially in the order they were defined
server.on('request', function(request) {
   request.approved = true;
});

server.on('request', function(request){
   console.log(request);
});

// server.on('error', function(e) {
//     //...
// });

server.emit('request', {from: "Client"});  // emits event and attaches data to it
server.emit('request', {from: "One more client"});

console.log("All listeners. Count: %d, Listeners: \n%s ", server.listenerCount('request'), server.listeners('request'));

server.emit('error', new Error("Some error"));  // throws Error, unless there is a handler
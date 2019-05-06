var url = require('url');
var subscribers = {};

function chatServer(req, res) {
    if(req.method == 'GET') {  // requested subscription
        subscribe(req, res);
    } else if(req.method == 'POST') { // received message from user, distribute
        var message = "";
        req.setEncoding('utf-8');
        req.on('data', function(chunk) {
            message += chunk;
            if(message.length>1e4) {  // security measure: don't accept too big messages
                res.statusCode = 413;
                res.end("Your message is too big for this chat.");
            }
        }).on('end', function() {
            publish(message);
            res.end();
        });
    } else {
        res.status = 400;
        res.end("Incorrect HTTP method.")
    }

    function subscribe(req, res) {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache, must-revalidate");

        var userid = url.parse(req.url, true).query.userid;
        if(!userid) {
            res.status = 400;
            res.end("Specify used id in the request params.")
        } else {
            subscribers[userid] = res;  // keep connection with userid until message arrives
            console.log("User with id %d has joined the chat.", userid);
        }

        res.on("close", function() {    // connection interrupted (e.g. user disconnected)
            console.log("User with id %d has left the chat.", userid);
            delete subscribers[userid];
        });
    }

    function publish(message) {
        console.log("Sending message %s to %d subscribers.", message, Object.keys(subscribers).length);
        for(var id in subscribers) {
            subscribers[id].end(message);  // message sent
            delete subscribers[id];  // connection closed
        }
    }

}

module.exports = chatServer;
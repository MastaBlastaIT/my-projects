var fs = require('fs');
var url = require('url');
var mime = require('mime'); // https://www.npmjs.com/package/mime
const path = require('path');

var count = 0; // # of file requests
var STATIC_ROOT = path.join(__dirname, 'public');

/**
 * Handles request to a file, validates it and returns a file.
 * @param {stream.Readable} req - input stream
 * @param {stream.Writable} res - output stream
 */ 
function serveStatic(req, res) {
    try {
        var filepath = decodeURIComponent(url.parse(req.url).pathname);
        if(filepath === '/') {
            filepath = '/index.html';
        }
    } catch(e) {
        res.statusCode = 400;
        res.end('400 Bad request');
        return;
    }

    if(~filepath.indexOf('\0')) {  // if string starts with zero byte
        res.statusCode = 400;
        res.end('400 Bad request');
        return;
    }

    filepath = path.normalize(path.join(STATIC_ROOT, filepath));

    if(filepath.indexOf(STATIC_ROOT) != 0) {  // someone hacked path by using ../ segments, etc.
        res.statusCode = 404;
        res.end("File not found");
        return;
    }

    fs.stat(filepath, function(err, stats) {  // check that the file exists
        if(err || !stats.isFile()) {
            res.statusCode = 404;
            res.end("404 File not found");
            return;
        }

        sendFile(filepath, res, 2);  // put into callback to make sure it is executed after all checks
            // note the rest of the checks above are in synchronous code
    });


}

/**
 * Sends file located at `path` to the open response stream. Closes response stream as a result.
 * @param {string} filepath - valid path to a file.
 * @param {Writable} res - response stream.
 * @param {boolean} mode - if 0 (default), reads the file to memory and then pushes to user;
 * 1 - use streams in pipe mode ('data' event);
 * 2 - use streams with 'readable' event.
 */
function sendFile(filepath, res, mode) {
    mode = mode || 0;
    try {
        var mimeStr = mime.lookup(filepath);
    } catch(e) {
        console.error(e);
    }
    console.log(mimeStr);
    var isTextDocument = (mimeStr.indexOf('text') === -1 ? false : true);
    mimeStr = mimeStr + (isTextDocument ? '; charset: utf-8' : '');

    if(mode === 0) {  // Load into memory and send
        fs.readFile(filepath, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end("500 Internal server error");
                throw err;  // if not handled, kills server
            } else {
                res.setHeader('Content-Type', mimeStr);
                res.end(data);
                console.log("Requests handled: ", ++count);
            }
        });

    } else if(mode === 1) {  // Streams: pipe
        var readStream = fs.createReadStream(filepath);
        if(isTextDocument) { readStream.setEncoding('utf-8'); }
        res.setHeader('Content-Type', mimeStr);
        var totalBytes = 0;
        readStream.pipe(res);
        readStream.on('data', function(chunk) {
            // use "data" for pipe mode, use "readable" to manually read data using readStream.read()
            totalBytes += chunk.length;
        }).on('error', function(err) {
            res.statusCode = 500;
            res.end("500 Internal server error");
            throw err;  // if not handled, kills server
        }).on('end', function() {
            console.log("Requests handled: %d. Total bytes transmitted: %d.", ++count, totalBytes);
        });
        res.on("close", function() {  // connection was interrupted!
            readStream.destroy();
        });


    } else {  // Streams: readable
        var readStream = fs.createReadStream(filepath);
        if(isTextDocument) { readStream.setEncoding('utf-8'); }
        var totalBytes = 0;
        res.setHeader('Content-Type', mimeStr);

        readStream.on('readable', write
        ).on('error', function(err) {
            res.statusCode = 500;
            res.end("500 Internal server error");
            throw err;  // if not handled, kills server
        }).on('end', function() {
            res.end();
            console.log("Requests handled: %d. Total bytes transmitted: %d.", ++count, totalBytes);
        });

        res.on("close", function() {  // connection was interrupted!
            readStream.destroy();
        });

        function write() {  // read data from readStream and send it to res, so that buffer does not overflow
            var chunk;
            while(null !== (chunk = readStream.read())) {  // when no data is available, read() returns null
                totalBytes += chunk.length;
                if (!res.write(chunk)) {  // res is not available, so the data is written to buffer
                    readStream.removeListener('readable', write);  // hence stop reading
                    res.once('drain', function () {  // "drain" is emitted when res is ready again
                        readStream.on('readable', write);  // start reading again
                        write();
                    });
                    break;
                }
            }
        }
    }
}

module.exports = serveStatic;


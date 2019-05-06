var path = require('path');
var fs = require('fs');

var uploads = {};
var interruptCount = 1;
var MAX_INTERRUPTIONS = 2; // number of emulated file upload interruptions

function onUpload(req, res) {
    var fileId = req.headers['x-file-id'];
    var startByte = req.headers['x-start-byte'] || 0;

    if (!fileId) {
        res.writeHead(400, "No file id");
        res.end();
    }

    // var filePath = '/dev/null'; // загрузить "в никуда"
    var dirString = path.join(path.dirname(fs.realpathSync(__filename)), 'uploads');
    if (!fs.existsSync(dirString)) {
        fs.mkdirSync(dirString);
    }
    var filePath = path.join(dirString, fileId);

    console.log("onUpload fileId: ", fileId);

    // init first upload
    if (!uploads[fileId]) {
        uploads[fileId] = {};
        uploads[fileId].bytesReceived = 0;
    }

    console.log("onUpload bytesReceived: " + uploads[fileId].bytesReceived + ", startByte:" + startByte)

    if (startByte == 0) { // new upload
        var fileStream = fs.createWriteStream(filePath, {
            flags: 'w'
        });
        console.log("New file created: " + filePath);

    } else { // continuing upload
        if (uploads[fileId].bytesReceived != startByte) {
            res.writeHead(400, "Wrong start byte");
            res.end(String(uploads[fileId].bytesReceived));
            return;
        }
        fileStream = fs.createWriteStream(filePath, { // append to existing file
            flags: 'a'
        });
        console.log("File reopened: " + filePath);
    }


    req.on('data', function(data) {
        uploads[fileId].bytesReceived += data.length;
    });

    req.pipe(fileStream); // send req body to file

    fileStream.on('close', function() { // pipe connection closed
        if (uploads[fileId].bytesReceived == req.headers['x-file-size']) { // upload complete
            console.log("File finished: bytesReceived " + req.headers['x-file-size']);
            res.end("Success " + uploads[fileId].bytesReceived);
            delete uploads[fileId];
        } else { // upload not complete, but connection was closed
            fileStream.close();
            res.writeHead(500, "The file descriptor was closed before the file was fully uploaded.");
            console.log("File unfinished, stopped at " + uploads[fileId].bytesReceived);
            res.end(String(uploads[fileId].bytesReceived));
        }
    });

    fileStream.on('error', function(err) { // send error response back to client in case of file stream errors
        fileStream.close();
        console.log("fileStream error");
        res.writeHead(500, "File error");
        res.end();
    });

}

function onStatus(req, res) {
    var fileId = req.headers['x-file-id'];
    var upload = uploads[fileId];
    console.log("onStatus fileId: ", fileId, ", upload: ", upload);
    if (!upload) {
        res.end("0")
    } else {
        res.end(String(upload.bytesReceived));
    }
}


exports.onUpload = onUpload;
exports.onStatus = onStatus;

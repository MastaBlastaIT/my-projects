module.exports = function(parsedUrl, res) {
    if (parsedUrl.query['message']) {
        res.setHeader('Cache-control', 'no-cache');
        res.end(parsedUrl.query['message']);  // 200 by default
    } else {
        res.statusCode = 404;
        res.end("Specify message URL parameter in response");  // response.write() to append before ending connection
    }
}
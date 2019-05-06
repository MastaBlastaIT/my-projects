const liveServer = require('live-server');

const params = {
  port: 8000, // Set the server port. Defaults to 8080.
  open: false // When false, it won't load your browser by default.
};

liveServer.start(params);

let express = require("express");
let app = express();

let getPalette = require('./lib/getPalette');

app.set('view engine', 'jade');

app.get("/", function (req, res) {
  res.render("index", { palette: getPalette() });
});

app.listen(9000);

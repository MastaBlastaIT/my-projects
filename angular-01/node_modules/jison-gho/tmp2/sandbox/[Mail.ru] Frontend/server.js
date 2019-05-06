var express = require('express'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    app = express();

var HOSTNAME = 'localhost',
    PORT = 3000,
    PUBLIC_DIR = path.join(__dirname,'public_html');

// app.use(function (req) {
// 	// Здесь нужно написать журналирование в формате
// 	// (журналирование - вывод в консоль)
// 	// [время] [номер запроса по счету]
// });

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});
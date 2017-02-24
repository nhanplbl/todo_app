global.__base = __dirname + '/';
global.__mongodb = require(__base + 'services/mongodb');

__mongodb.init();

var port = process.env.PORT || 9000;

var app = require(__base + '/api/routes')();

__mongodb.start(function(err) {
	if (err) {
		console.log('ERROR', err);
		return;
	}
	console.log('Mongodb connected');
	app.listen(port);
	console.log('server starting on port:', port);
})
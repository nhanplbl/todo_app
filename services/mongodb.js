var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

var config = require(__base + 'config/config');

// Go through each model file and load it.
mongoose.init = function() {
	var modelsPath = __base + 'mongo_models';
	fs.readdirSync(modelsPath).forEach(function (file) {
	  if (/(.*)\.(js$|coffee$)/.test(file) && file != 'index.js') {
	    require(modelsPath + '/' + file);
	    console.log('Model found: ' + file);
	  }
	});
}

mongoose.start = function(callback) {
	return mongoose.connect(config.mongo.uri, callback);
}
module.exports = mongoose;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var todoCtrl = require(__base + 'controllers/todo');

router.route('/todo')
	.post(todoCtrl.createTodo)
	.get(todoCtrl.getTodo);

router.route('/todo/items/:_id')
	.post(todoCtrl.createItem)
	.get(todoCtrl.getItems)


module.exports = function() {
	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: true}));
	app.use(bodyParser.json());
	app.use('/', router);
	return app;
}
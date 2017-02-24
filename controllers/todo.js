var Todo = __mongodb.model('todo');

exports.createTodo = function(req, res) {
	var body = req.body;

	var name = body.name;
	var type = body.type || 'LIST';

	if (!name) {
		return res.status(400).send('NAME_BE_REQUIRED');
	}

	Todo.create({
		name: name,
		type: type.toUpperCase(),
		items: []
	}, function(err, newTodo) {
		if (err) {
			console.log(err);
			return res.status(400).send('SERVER_ERROR');
		}
		if (!newTodo) {
			console.log('CANT_CREATE_NEW_TODO');
			return res.status(400).send('CANT_CREATE');
		}
		return res.status(200).send(newTodo);
	})
}

var queryTodos = function(options, callback) {
	var conditions = options.conditions || "{}";
	var limit = Math.max(1, Math.min(options.limit || 30, 30));
	var skip = parseInt(options.skip) || 0;
	console.log(skip, limit);
	var sort = options.sort || "{}";
	var select = options.select || JSON.stringify({
		name: 1,
		type: 1,
		numberOfItem: 1,
		dateCreated: 1,
		dateModified: 1,
		status: 1
	});
	
	conditions = JSON.parse(conditions);
	sort = JSON.parse(sort);
	select = JSON.parse(select);

	Todo
		.find(conditions)
		.skip(skip)
		.limit(limit)
		.sort(sort)
		.select(select)
		.exec(callback)
}

exports.getTodo = function(req, res) {
	return queryTodos(req.query, function(err, todos) {
		if (err) {
			console.log('ERROR', err);
			return res.status(400).send('WRONG_CONDITIONS');
		}
		return res.status(200).send(todos);
	})
}

exports.createItem = function(req, res) {
	var _id = req.params._id;
	var body = req.body;
	var title = body.title;
	var description = body.description || '';

	if (!title) {
		return res.status(400).send('TITLE_BE_REQUIRED');
	}

	var now = new Date().getTime();
	var time = parseInt(body.time || now);

	Todo.findOneAndUpdate({
		_id: _id
	}, {
		$push: {
			items: {
				title: title,
				description: description,
				status: 'created',
				time: time,
				created_at: now
			}
		},
		$inc: {
			numberOfItem: 1
		}
	}, {
		new: true
	}, function(err, updatedTodo) {
		if (err) {
			console.log('ERROR', err);
			return res.status(400).send('SERVER_ERROR');
		}
		if (!updatedTodo) {
			console.log('CANT_FIND');
			return res.status(400).send('TODO_NOT_FOUND');
		}
		return res.status(200).send({
			_id: updatedTodo._id,
			status: updatedTodo.status,
			items: updatedTodo.items
		});
	})
}

exports.getItems = function(req, res) {
	var conditions = JSON.stringify({
		_id: req.params._id
	})
	var select = JSON.stringify({
		items: 1,
		status: 1
	})

	return queryTodos({
		conditions: conditions,
		select: select
	}, function(err, todos) {
		if (err) {
			console.log('ERROR', err);
			return res.status(400).send('WRONG_CONDITIONS');
		}
		return res.status(200).send(todos[0]);
	})
}
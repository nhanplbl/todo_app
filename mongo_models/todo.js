var Schema = __mongodb.Schema;

var schema = new Schema({
	name: String,
	type: String,
	items: [{
		title: String,
		description: String,
		time: Number,
		created_at: Number,
		status: String
	}],
	numberOfItem: {type: Number, default: 0},
	status: {type: String, default: 'created'},
	dateCreated: Number,
	dateModifined: Number,
	metadata: {}
})

schema.pre('save', function(next) {
	var date = new Date().getTime();
	if (this.isNew) {
		this.dateCreated = date;
	}
	this.dateModifined = date;
	return next();
})

module.exports = __mongodb.model('todo', schema);
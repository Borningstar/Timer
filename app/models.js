module.exports = function(mongoose, db){
	var stampSchema = mongoose.Schema({
		user: { type: String, default: "Anonymous" },
		location: { type: String, default: "Anonymous" },
		date: { type: Date, default: Date.now }  
	});

	var models = {
		Stamp: db.model('Stamp', stampSchema)
	};

	return models;
}
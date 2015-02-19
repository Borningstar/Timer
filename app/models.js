module.exports = function(mongoose, db){
	var stampSchema = mongoose.Schema({
		user: { type: String, default: "Anonymous" },
		location: { type: String, default: "Anonymous" },
		longitude: { type: String, default: "" },
		latitude: { type: String, default: "" },
		date: { type: Date, default: Date.now },
		message: {type: String, default: ""}  
	});

	var models = {
		Stamp: db.model('Stamp', stampSchema)
	};

	return models;
}
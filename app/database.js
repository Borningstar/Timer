var mongoose = require('mongoose');

if (!process.env.NODE_ENV === "test"){
	mongoose.connect('mongodb://localhost/stamps_db');
	var models = require('./models')(mongoose);
} else {
	mongoose.disconnect();
	var db = mongoose.createConnection('mongodb://localhost/test');
	var models = require('./models')(mongoose, db);
	models.Stamp.remove({}, function(err){
		//if (err) throw error;
	})
}

module.exports = models;






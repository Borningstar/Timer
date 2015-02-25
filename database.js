var mongoose = require('mongoose');

var models;

if (!process.env.NODE_ENV === "development"){
	mongoose.connect('mongodb://localhost/stamps_db');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		console.log('Connected to stamps_db');
	  	models = require('./models')(mongoose);
	});
} else {
	mongoose.disconnect();
	var db = mongoose.createConnection('mongodb://localhost/test');
	models = require('./models')(mongoose, db);
//	models.Stamp.remove({}, function(err){
		//if (err) throw error;
//	})
}

module.exports = models;
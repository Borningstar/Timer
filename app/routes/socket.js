module.exports = function(app, io){

	var request = require('request');
	var database = require('./../database');
	var models = database;

	io.on('connection', function (socket) {

	  socket.on('stamp', function (data) {

	    console.log(data.time + ", " + data['address']);

	    var stamp = new models.Stamp();

	    stamp.location = data['address'];
	    stamp.longitude = data['longitude'];
	    stamp.latitude = data['latitude'];

    	stamp.save(function(){
			models.Stamp
				.find()
				.sort({'date': -1})
				.limit(5)
				.exec(function (err, stamps){
					io.emit('stamps', stamps);
				});
		});

	  });
	});
};
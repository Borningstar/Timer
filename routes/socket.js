module.exports = function(app, io){

	var request = require('request');
	var database = require('./../database');
	var models = database;

	io.on('connection', function (socket) {

		var count = models.Stamp.count({}, function(err, count){
			models.Stamp
				.find()
				.sort({'date': 1})
				.skip(function(){if (count - 100 < 1) {return count} else { return count - 100}})
				.exec(function (err, stamps){
					io.emit('stampSet', stamps);
				});
		});

	  	socket.on('stamp', function (data) {

	    console.log(data.time + ", " + data['address']);

	    var stamp = new models.Stamp();

	    stamp.location = data['address'];
	    stamp.longitude = data['longitude'];
	    stamp.latitude = data['latitude'];
	    if (data['name'] != ''){
	    	stamp.user = data['name'];
	    }
	    stamp.message = data['message']

    	stamp.save(function(){
    		var count = models.Stamp.count({}, function(err, count){
				models.Stamp
					.find()
					.sort({'date': 1})
					.skip(count - 5)
					.exec(function (err, stamps){
						io.emit('stamps', stamps);
					});

				models.Stamp.findOne({}, {}, {sort: {'date': -1}}, function (err, stamp){
						io.emit('newStamp', stamp);
					});
    		});
		});

	  });
	});
};
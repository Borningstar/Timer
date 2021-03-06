module.exports = function(app, io){

	var request = require('request');
	var database = require('./../database');
	var models = database;

	io.on('connection', function (socket) {

		var count = models.Stamp.count({}, function(err, count){
			models.Stamp
				.find()
				.sort({'date': -1})
				.limit(100)
				.exec(function (err, stamps){
					io.emit('stampSet', stamps);
				});
		});

	  	socket.on('stamp', function (data) {

	    console.log(data.date + ", " + data['location']);

	    var stamp = new models.Stamp();

	    stamp.date = data['date'];
	    stamp.location = data['location'];
	    stamp.longitude = data['longitude'];
	    stamp.latitude = data['latitude'];
	    if (data['user'] != ''){
	    	stamp.user = data['user'];
	    	stamp.user = stamp.user.replace(/>|</g, '');
	    }
	    stamp.message = data['message']
	    stamp.message = stamp.message.replace(/>|</g, '');

    	stamp.save(function(){
    		var count = models.Stamp.count({}, function(err, count){
				models.Stamp.findOne({}, {}, {sort: {'date': -1}}, function (err, stamp){
						socket.broadcast.emit('newStamp', stamp);
					});
    		});
		});

	  });
	});
};
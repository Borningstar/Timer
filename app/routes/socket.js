module.exports = function(app, io){

	var database = require('./../database');
	var models = database;

	io.on('connection', function (socket) {

	  socket.on('stamp', function (data) {
	    console.log(data);
	    var stamp = new models.Stamp();
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
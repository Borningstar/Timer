module.exports = function(app, io){

	var request = require('request');
	var database = require('./../database');
	var models = database;

	io.on('connection', function (socket) {

	  socket.on('stamp', function (data) {
	    
	    var ip = socket.request.connection.remoteAddress;
	    console.log(data.time + ", " + ip);
	    var url = "http://ip-api.com/json/" + ip;
	    var address;
	    var stamp = new models.Stamp();

	    request(url, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		      var info = JSON.parse(body)
		      if (info['status'] === "success"){
			      address = info['regionName'] + ", " + info['countryCode'];
			      stamp.location = address;
			  }

			stamp.save(function(){
				models.Stamp
					.find()
					.sort({'date': -1})
					.limit(5)
					.exec(function (err, stamps){
						io.emit('stamps', stamps);
					});
			});
		    }
		})
	  });
	});
};
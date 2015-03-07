var stampArray = require('./stampArray');
var stampControl = require('./stampControl');
var $ = require('jquery');
var socket = io.connect();

socket.on('stampSet', function (data) {
	stampArray.set(data);
	stampControl.set(stampArray.get(5).reverse());
	stampControl.populate();
});

socket.on('newStamp', function (data) {
	addStamp(data);
});

function addStamp(stamp){
    stampArray.add(stamp);
    stampControl.set(stampArray.get(5).reverse());
    stampControl.populate();
    stampControl.ping();
}

$("#stamp-button").click(function(){
	$.get("http://ip-api.com/json/", function(response) {
    	add = response.city;
    	if (response.region != ""){
    		add += ", " + response.region;
    	}
    	if (response.country != ""){
    		add += ", " + response.country;
    	}
    	lat = response.lat;
    	lon = response.lon;

        name = $('#name').val();
        if (name === ""){
            name = "Anonymous";
        }

        var newStamp = { date: new Date(), 
                        location: add, 
                        latitude: lat, 
                        longitude: lon, 
                        user: name,
                        message: $('#message').val() };

        addStamp(newStamp);

    	socket.emit('stamp', newStamp);

    	$('#message').val('');

	}, "jsonp");
});

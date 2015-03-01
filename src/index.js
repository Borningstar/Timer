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
	stampArray.add(data);
	stampControl.set(stampArray.get(5).reverse());
	stampControl.populate();
	stampControl.ping();
});

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

    	socket.emit('stamp', { time: new Date(), address: add, latitude: lat, longitude: lon, name: $('#name').val(), message: $('#message').val() });

    	$('#message').val('');

	}, "jsonp");
});

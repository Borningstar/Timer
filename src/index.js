var $ = require('./jquery');
var timer = require('./timer');
var socket = io.connect();

var stampArray = (function () {
	var array;

	var setArray = function (data){
		array = data;
	};

	var getArray = function (amount){
		var trimmedArray = [];

		if (!amount){
			amount = array.length;
		} else if (amount > array.length){
			amount = array.length;
		}

		for (var i = 0; i < amount; i++){
			trimmedArray[trimmedArray.length] = array[i];
		};

		return trimmedArray;
	};

	var addStamp = function (stamp){
		if (array.length > 100){
			array.pop();
		}
		array.unshift(stamp);
	};

	return {
		set: setArray,
		get: getArray,
		add: addStamp
	};
}());

var stampControl = (function () {
	var stamps;
	var stampTimer = setInterval(function () {timer(new Date(stamps[0].date), "timer")}, 1000);

	var setStamps = function (newStamps){
		stamps = newStamps;
	};

	var populateStamps = function (){
		var list = "";

		for(var i in stamps){
			list = "<tr>" +
						"<td>" + new Date(stamps[i].date).toLocaleTimeString() + "</td>" +
						"<td>" + stamps[i].location + "</td>" +
						"<td>" + stamps[i].user + "</td>" +
						"<td>" + stamps[i].message + "</td>" +
					"</tr>"
					 + list;
		}
		$("#stamps-list").html(list);
	};

	var pingMap = function (){
		var pings = "";
		var bottom = ((parseFloat(stamps[0].latitude) + 90) / 180 * 100) - 0.5;
		var left = ((parseFloat(stamps[0].longitude) + 180) / 360 * 100) - 0.5;

		pings += "<div style='bottom: " + bottom + "%; left: " + left + "%;' class='dot'><span class='ping1'></span><span class='ping2'></span><span class='ping3'></span></div>";
		var map = "<img src='map.jpg' style='width: 100%;'>";
		
		$("#map").html(map + pings);
		
		setTimeout(function(){
			$(".dot").remove();
		}, 1000)
	};

	return {
		set: setStamps,
		populate: populateStamps,
		ping: pingMap
	};
}());

socket.on('stampSet', function (data) {
	stampArray.set(data);
	stampControl.set(stampArray.get(5));
	stampControl.populate();
});

socket.on('newStamp', function (data) {
	stampArray.add(data);
	stampControl.set(stampArray.get(5));
	stampControl.populate();
	stampControl.ping();
});

$("#stamp-button").click(function(){
	var ip;
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
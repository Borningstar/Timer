var $ = require('jquery');
var timer = require('./timer');

var stampControl = (function () {

	var stamps;
	var stampTimer = setInterval(function () {timer(new Date(stamps[4].date), "timer")}, 1000);

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
	
	var pingMap = function(){
		pingControl.ping(parseFloat(stamps[0].latitude), parseFloat(stamps[0].longitude));
	}

	return {
		set: setStamps,
		populate: populateStamps,
		ping: pingMap
	};
}());

var pingControl = (function () {

	var pingArray = [];

	var cleanupTimer = setInterval(function(){pingCleanup();}, 2000);

	var pingMap = function (latitude, longitude){
		var pingID = Date.parse(new Date());
		var bottom = ((latitude + 90) / 180 * 100) - 0.5;
		var left = ((longitude + 180) / 360 * 100) - 0.5;	

		ping = "<div style='bottom: " + bottom + "%; left: " + left + "%;' class='dot' id='" + pingID + "';></div>";
		
		$("#pings").append(ping);
		if (pingArray){
			pingArray.push(pingID);
		} else {
			pingArray = pingID;
		}	
	};

	function pingCleanup(){

		var time = Date.parse(new Date());

		for (var i = 0; i < pingArray.length; i++){
			if (time - pingArray[i] > 5000){
				$('#' + pingArray[i]).remove();
				pingArray.splice(i, 1);
			}
		}
	}

	return {
		ping: pingMap,
	}

}());

module.exports = stampControl;


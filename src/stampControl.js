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

module.exports = stampControl;


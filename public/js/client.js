var socket = io.connect();
var latestStamp;

function getStamps(){
	$.get("/stamps", function(data){
		latestStamp = new Date(data[0].date);
		var list = "";
		var pings = "";
		var x = data.length - 1;
		for(var i in data){
			list = "<tr>" +
						"<td>" + new Date(data[x].date).toLocaleTimeString() + "</td>" +
						"<td>" + data[x].location + "</td>" +
						"<td>" + data[x].user + "</td>" +
						"<td>" + data[x].message + "</td>" +
					"</tr>"
					 + list;
			x -= 1;	
		}
	$("#stamps-list").html(list);
	});
}

getStamps();

var myVar = setInterval(function () {timer()}, 1000);

function timer(){{
	var date = new Date();
	var time = msToTime(Math.abs(date - latestStamp));
	document.getElementById("timer").innerHTML = time;
}}

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ' Hours, ' + mins + ' Minutes, ' + secs + ' Seconds since the last stamp.';
}

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

socket.on('stamps', function (data) {
	latestStamp = new Date(data[0].date);
  	var list = "";
  	var pings = "";
		for(var i in data){
			list = "<tr>" +
						"<td>" + new Date(data[x].date).toLocaleTimeString() + "</td>" +
						"<td>" + data[i].location + "</td>" +
						"<td>" + data[i].user + "</td>" +
						"<td>" + data[i].message + "</td>" +
					"</tr>"
					 + list;
		}
	var bottom = ((parseFloat(data[0].latitude) + 90) / 180 * 100) - 0.5;
	var left = ((parseFloat(data[0].longitude) + 180) / 360 * 100) - 0.5;
	pings += "<div style='bottom: " + bottom + "%; left: " + left + "%;' class='dot'><span class='ping1'></span><span class='ping2'></span><span class='ping3'></span></div>";
	var map = "<img src='map.jpg' style='width: 100%;'>";
	$("#map").html(map + pings);
	setTimeout(function(){
		$(".dot").remove();
	}, 1000)
	
	$("#stamps-list").html(list);
});


var socket = io.connect();
var latestStamp;

function getStamps(){
	$.get("/stamps", function(data){
		latestStamp = new Date(data[0].date);
		var list = "";
		for(var i in data){
			list = "<tr>" +
						"<td>" + new Date(data[i].date) + "</td>" +
						"<td>" + data[i].location + "</td>" +
						"<td>" + data[i].user + "</td>" +
					"</tr>"
					 + list;
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
	socket.emit('stamp', { time: new Date() });
});

socket.on('stamps', function (data) {
	latestStamp = new Date(data[0].date);
  	var list = "";
		for(var i in data){
			list = "<tr>" +
						"<td>" + new Date(data[i].date) + "</td>" +
						"<td>" + data[i].location + "</td>" +
						"<td>" + data[i].user + "</td>" +
					"</tr>"
					 + list;
		}
	$("#stamps-list").html(list);
});


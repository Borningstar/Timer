var stampArray = require('./stampArray');
var stampControl = require('./stampControl');
var $ = require('jquery');
var socket = io.connect();
var locationAPI = require('./locationAPI');

socket.on('stampSet', function (data) {
    locationAPI.call();
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

    var name = $('#name').val();
    if (name === ""){
        name = "Anonymous";
    }

    var newStamp = { date: new Date().getTime(), 
                    location: locationAPI.add(), 
                    latitude: locationAPI.lat(), 
                    longitude: locationAPI.lon(), 
                    user: name,
                    message: $('#message').val() };

    addStamp(newStamp);

    socket.emit('stamp', newStamp);

    $('#message').val('');
});

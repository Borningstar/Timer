var $ = require('jquery');

var locationAPI = (function () {

    var address;
    var latitude;
    var longitude;

    var makeCall = function(){
        $.get("http://ip-api.com/json/", function(response) {
            address = response.city;
            if (response.region != ""){
                address += ", " + response.region;
            }
            if (response.country != ""){
                address += ", " + response.country;
            }
            latitude = response.lat;
            longitude = response.lon;

        }, "jsonp");
    }

    var getAddress = function(){
        return address;
    }

    var getlatitude = function(){
        return latitude;
    }

    var getlongitude = function(){
        return longitude;
    }

    return {
        add: getAddress,
        lat: getlatitude,
        lon: getlongitude,
        call: makeCall
    }

}());

module.exports = locationAPI;
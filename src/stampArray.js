var _ = require('underscore');

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
		//If the order of the array is wrong after adding a new stamp, sort array
		if(array[0].date < array[1].date){
			array = _.sortBy(array, 'date');
		}
	};

	return {
		set: setArray,
		get: getArray,
		add: addStamp
	};
}());

module.exports = stampArray;

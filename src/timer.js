var msToTime = require ('./msToTime');

module.exports = function timer(time, element){
  var date = new Date();
  var time = msToTime(Math.abs(date - time));
  document.getElementById(element).innerHTML = time;
}
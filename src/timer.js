var msToTime = require ('./msToTime');

module.exports = function timer(oldTime, element){
  var currentTime = new Date();
  var time = msToTime(Math.abs(currentTime - oldTime));
  document.getElementById(element).innerHTML = time;
}
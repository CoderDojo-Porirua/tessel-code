// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic climate example logs a stream
of temperature and humidity to the console.
*********************************************/

var tessel = require('tessel');

// if you're using a si7005 replace this lib with climate-si7005
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);

var ledGreen = tessel.led[0].output(0);
var ledBlue = tessel.led[1].output(0);
var ledRed = tessel.led[2].output(0);

climate.on('ready', function () {
  console.log('Connected to si7005');

  setInterval(function () {
    ledRed.toggle();
  }, 100);

var counter = 0;

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('c', function (err, temp) {
      climate.readHumidity(function (err, humid) {

        ledRed.toggle();

        var now = new Date();
        var logLine = now.toISOString().substr(11, 8) + ', '
                      +  temp.toFixed(4) + 'C, '
                      +  humid.toFixed(4) + '%RH';
        console.log(logLine);

        // Log every 5 seconds
        setTimeout(loop, 1000);
      });
    });
  });
});

function tempToColour(temp,min,max, cb){
  // 0 - 17 - Blue
  // 18-22 Green
  // 23 - 35 Red
  var greenMin = min;
  var greenMax = max;

  console.log(temp);
  console.log(greenMin);
  console.log(greenMax);

  if(temp<greenMin){
    console.log("green");
  } else
  {
    if(temp>greenMax){
      console.log("red");
    } else
    {
      console.log("range");

      var greenRange = greenMax - greenMin;
      // Convert temp into number between 0 and 1.
      var tempGreenRange = (temp - greenMin) / (greenRange);
      // 0 -> 0.5 blue -> green
      // 0.5 -> 1 green -> red
      console.log("tempGreenRange = " + tempGreenRange);

      var blue = 63 * (1.0 -(Math.min((tempGreenRange/0.5), 1.0)));
      var red = 63 * (Math.max(((tempGreenRange-0.5)/0.5), 0));
      var green = 63 - blue - red;
    }
  }
}

climate.on('error', function(err) {
  console.log('error connecting module', err);
});

/*

//sdcard.on('ready', function() {
//sdcard.getFilesystems(function(err, fss) {
    //fs = fss[0];
    console.log('Writing...');

    var now = new Date();
    // toIsoString() returns in format: '2015-02-28T07:50:44.008Z'
    // 0         1         2
    // 012345678901234567890123
    // |        |
    // 2015-02-28T07:50:44.008Z
    filename = now.toISOString().substr(0, 10) + '.log';
    console.log('logging to: ' + filename);
    fs.appendFile(filename, '\n\nClimate logging...\n', function(err) {
      ledGreen.toggle();
      //console.log("Wrote to " + filename)
    //});
  //});
});

*/

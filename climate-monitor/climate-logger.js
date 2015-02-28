// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic climate example logs a stream
of temperature and humidity to the console.
*********************************************/

var tessel = require('tessel');
// if you're using a si7005 replace this lib with climate-si7005
var climatelib = require('climate-si7020');
var sdcardlib = require('sdcard');

var climate = climatelib.use(tessel.port['A']);
var sdcard = sdcardlib.use(tessel.port['B']);
var ledGreen = tessel.led[0].output(0);
var ledBlue = tessel.led[1].output(0);
var ledRed = tessel.led[2].output(0);

var fs = null;
var filename = null;

climate.on('ready', function () {
  console.log('Connected to si7005');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('c', function (err, temp) {
      climate.readHumidity(function (err, humid) {

        ledRed.toggle();
          setTimeout(function () {
          ledRed.toggle();
        }, 100);

        var now = new Date();
        var logLine = now.toISOString().substr(11, 8) + ', '
                      +  temp.toFixed(4) + 'C, '
                      +  humid.toFixed(4) + '%RH';
        console.log(logLine);

        if(fs != null && filename != null)
        {
          fs.appendFile(filename, logLine + '\n', function(err) {
            ledBlue.toggle();
            setTimeout(function () {
                ledBlue.toggle();
            }, 100);
            //console.log('Write to ' + filename + ' complete.');
          });
        }

        // Log every 5 seconds
        setTimeout(loop, 5000);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});

sdcard.on('ready', function() {
  sdcard.getFilesystems(function(err, fss) {
    fs = fss[0];
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
    });
  });
});
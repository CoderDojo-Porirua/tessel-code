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

var fs;
var filename;

climate.on('ready', function () {
  console.log('Connected to si7005');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('c', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        console.log('Degrees:', temp.toFixed(4) + 'C', 'Humidity:', humid.toFixed(4) + '%RH');

        if(fs != null && filename != null)
        {
              fs.writeFile(filename, 'Degrees:', temp.toFixed(4) + 'C', 'Humidity:', humid.toFixed(4) + '%RH');
        }
        setTimeout(loop, 300);
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

    var now = Date.now();
    filename = now.getYear() + '-' + now.getMonth() + '-' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.log';

  });
});
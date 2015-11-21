var tessel = require('tessel');
// if you're using a si7005 replace this lib with climate-si7005
var oledlib = require('tessel-digole12864')

var digole12864 = oledlib.use(tessel.port['D']);

var counter = 0;

digole12864.on('ready', function(){
  console.log("Begin test...");
  digole12864.clear();
  digole12864.stringXY(0,10,"TEST...\n", function(){});

  setInterval(function () {
    counter+=1;

    /*
    digole12864.colour(counter, 0, 0, function(){
        digole12864.stringXY(0,20,counter, function(){});
    });
    digole12864.colour(0, counter, 0, function(){
      digole12864.stringXY(0,40,counter, function(){});
    });
    digole12864.colour(0, 0, counter, function(){
      digole12864.stringXY(0,60,counter, function(){});
    });
    digole12864.colour(255, 255, 255, function(){
      digole12864.stringXY(0,80,counter, function(){});
    });
    */
    console.log('counter: ' + counter)
    digole12864.colour(counter, 0, 0);
    digole12864.stringXY(0,10,"R " + counter.toString() + "\n", function(){});

    digole12864.colour(0, counter, 0);
    digole12864.stringXY(0,30,"G " + counter.toString() + "\n", function(){});

    digole12864.colour(0, 0, counter);
    digole12864.stringXY(0,50,"B " + counter.toString() + "\n", function(){});

    digole12864.colour(255, 255, 255);
    digole12864.stringXY(0,70,"Normal " + counter.toString() + "\n", function(){});

  }, 500);

});
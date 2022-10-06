var gm = require('../')
  , dir = __dirname + '/imgs'

var path = dir + '/text.jpg';

gm(dir + '/text.jpg')
	.lat(20,20,"-10%")
	.write(dir + '/clearText.jpg', function(err) {
   // something                
});

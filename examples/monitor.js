var gm = require('../'),
	dir = __dirname + '/imgs',
	out = dir + '/mon.jpg';

gm(dir + '/original.jpg')
	.monitor()
	.resize(9000, 9000)
	.resizeExact(240, 240)
	.autoOrient()
	.flip()
	.write(out, function(err) {
		if (err) return console.dir(err)
			//console.log(this.outname + " created  ::  " + arguments[3])
	})
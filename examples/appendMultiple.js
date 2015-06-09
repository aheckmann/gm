var fs = require('fs')
  , gm = require('./gm')
  , dir = __dirname + '/imgs';

var out = dir + '/append.jpg'

//use * for all appending all images
gm(dir+'/*')
.append(dir+'/four.jpg')
.append()
.background('#222')
.write(out, function (err) {
  if (err) return console.dir(arguments)
  console.log(this.outname + " created  ::  " + arguments[3])
  require('child_process').exec('open ' + out)
});
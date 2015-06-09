var gm = require('../')
  , dir = __dirname + '/imgs'
  , out = dir + '/appendMultiple.jpg';

// using globbing feature
gm(dir+'/*.jpg')
.append(dir+'/lost.png')
.append()
.background('#222')
.write(out, function (err) {
  if (err) return console.dir(arguments)
  console.log(this.outname + " created  ::  " + arguments[3])
  require('child_process').exec('open ' + out)
});
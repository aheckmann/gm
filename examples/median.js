var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .median(4)
  .write(dir + '/median.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .colorize(80, 0, 30)
  .write(dir + '/colorize.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
) 

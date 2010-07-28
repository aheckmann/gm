var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .cycle(4)
  .write(dir + '/cycle.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

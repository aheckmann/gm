var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .lower(10, 14)
  .write(dir + '/lower.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

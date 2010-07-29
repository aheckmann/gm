var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .raise(10, 14)
  .write(dir + '/raise.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

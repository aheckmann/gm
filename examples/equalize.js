var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .equalize()
  .write(dir + '/equalize.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

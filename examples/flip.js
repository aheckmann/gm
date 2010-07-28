var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .flip()
  .write(dir + '/flip.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created :: " + arguments[3])
  }
) 

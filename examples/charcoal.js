var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .charcoal(1)
  .write(dir + '/charcoal.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
) 

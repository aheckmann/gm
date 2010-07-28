var gm = require('../gm')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.jpg')
  .rotate('red', -30)
  .write(dir + '/rotate.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 

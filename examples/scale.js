var gm = require('../gm')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.jpg')
  .resize(58, 20)
  .write(dir + '/scale.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 

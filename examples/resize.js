var gm = require('../gm')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.jpg')
  .resize(18, 10)
  .write(dir + '/resize.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 

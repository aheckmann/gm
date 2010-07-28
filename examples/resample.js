var gm = require('../gm')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.jpg')
  .resample(420, 120)
  .write(dir + '/resample.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 

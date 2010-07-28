var gm = require('../gm')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.png')
  .quality(5)
  .write(dir + '/quality.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 

var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .blur(19, 10)
  .write(dir + '/blur.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
) 

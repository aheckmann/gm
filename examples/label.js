var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .label("%m:%f %wx%h")
  .write(dir + '/label.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
) 

var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .morph(dir + '/morpher.jpg', dir + '/morph.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .implode(0.8)
  .write(dir + '/implode.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

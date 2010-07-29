var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .enhance()
  .write(dir + '/enhance.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

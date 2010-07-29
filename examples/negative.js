var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .negative()
  .write(dir + '/negative.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

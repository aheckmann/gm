var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .gamma(1.7, 2.3, 1.3)
  .write(dir + '/gamma.png', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

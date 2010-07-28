var gm = require('../gm')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.png')
  .minify()
  .write(dir + '/minify.png', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 

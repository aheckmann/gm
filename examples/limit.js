var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .limit("memory", "32MB")
  .limit("map", "64MB")
  .write(dir + '/limit.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
) 

var gm = require('../gm')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .comment("%m:%f %wx%h")
  .write(dir + '/comment.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
) 

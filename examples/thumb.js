var gm = require('../lib/gm')
  , sys = require('sys')
  , p = function(what){ sys.puts(sys.inspect(what)) }
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.jpg')
  .thumb(150, 50, dir + '/thumb.jpg', function(err){
    if (err) return p(arguments)
    p(this.outname + " created  ::  " + arguments[3])
  }
) 

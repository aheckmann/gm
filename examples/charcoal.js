var gm = require('../lib/gm')
  , sys = require('sys')
  , p = function(what){ sys.puts(sys.inspect(what)) }
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .charcoal(1)
  .write(dir + '/charcoal.jpg', function(err){
    if (err) return p(arguments)
    p(this.outname + ' created  :: ' + arguments[3])
  }
) 

var gm = require('../lib/gm')
  , sys = require('sys')
  , p = function(what){ sys.puts(sys.inspect(what)) }
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .modulate(120, 100, 80)
  .write(dir + '/modulate.jpg', function(err){
    if (err) return p(arguments)
    p(this.outname + ' created  :: ' + arguments[3])
  }
) 

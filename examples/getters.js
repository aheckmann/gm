var gm = require('../lib/gm')
  , sys = require('sys')
  , p = function(what){ sys.puts(sys.inspect(what)) }
  , dir = __dirname + '/imgs'

var methods = [
  "size"
, "identify"
, "format"
, "depth"
, "color"
, "res"
, "filesize"
]

var image = gm(dir + '/original.png')
methods.forEach(function(method){
  image[method](function(err, result){
    p(method + " result:")
    p(result)
  })
})


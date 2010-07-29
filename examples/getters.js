
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('../')
  , dir = __dirname + '/imgs'

var methods = 
[ "size"
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
    console.log(method + " result:")
    console.dir(result)
  })
})


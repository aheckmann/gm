
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('../')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.jpg')
  .thumb(150, 50, dir + '/thumb.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 


// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('../')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.jpg')
  .resize(58, 20)
  .write(dir + '/scale.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 


// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('../')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  // region must come before other affected arguments
  .region(130, 170, 307, 00).charcoal(1)
  .write(dir + '/region.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
) 

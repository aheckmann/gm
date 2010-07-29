
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('../')
  , dir = __dirname + '/imgs'
  
gm(dir + '/original.png')
  .chop(54, 1, 307, 1)
  .write(dir + "/chop.jpg", function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
  }
) 

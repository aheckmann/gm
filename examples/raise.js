
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('../')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .raise(10, 14)
  .write(dir + '/raise.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created :: ' + arguments[3])
  }
) 

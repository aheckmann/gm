var gm = require('../')
  , dir = __dirname + '/imgs'

gm(dir + "/original.jpg")
  .crop(140,100)
  .background("#FF0000")
  .extent(340,300)
  .write(dir + '/background.jpg', function (err) {
    if (err) return console.dir(arguments)
    console.log(this.outname + " created  ::  " + arguments[3])
});


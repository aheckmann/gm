var gm = require('../')
  , dir = __dirname + '/imgs'
  , imgs = 'bitdepth.png original.jpg'.split(' ').map(function (img) {
      return dir + '/' + img
    })
  , out = dir + '/compare.jpg'

gm.compare(imgs[0], imgs[1], { highlightColor: "#fff", file: out }, function (err) {
  if (err) return console.dir(arguments)
  console.log('The images are equal: %s', arguments[1]);
  console.log('Actual equality: %d', arguments[2]);
  console.log(this.outname + " created  ::  " + arguments[3]);
  require('child_process').exec('open ' + out);
});


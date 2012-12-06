var gm  = require('../')
  , fs  = require('fs')
  , dir = __dirname + '/../examples/imgs'

var buf = fs.readFileSync(dir + '/original.jpg');

gm(buf)
.noise('laplacian')
.write(dir + '/fromBuffer.png', function (err) {
  if (err) return console.dir(arguments);

  console.log(this.outname + ' created :: ' + arguments[3]);
});

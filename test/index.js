
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var dir = __dirname + '/../examples/imgs';
var gm = require('../')

function test () {
  return gm(dir + '/original.png');
}

var fs = require('fs');

fs.readdirSync(__dirname).forEach(function (file) {
  if (!/\.js$/.test(file)) return;
  if ('index.js' === file) return;

  var filename = __dirname + '/' + file;

  if (!fs.statSync(filename).isFile()) return;

  require(filename)(test(), dir, finish, gm);
});

function finish (err) {
  if (err) throw new Error(err);
}

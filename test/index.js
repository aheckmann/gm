
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var dir = __dirname + '/../examples/imgs';
var gm = require('../');
var assert = require('assert');
var gleak = require('gleak')();
var fs = require('fs');

var only = process.argv.slice(2);

var files = fs.readdirSync(__dirname).filter(filter);
var pending, total = pending = files.length * 2;

function filter (file) {
  if (!/\.js$/.test(file)) return false;
  if ('index.js' === file) return false;
  if (only.length && !~only.indexOf(file)) return false;

  var filename = __dirname + '/' + file;
  if (!fs.statSync(filename).isFile()) return false;
  return true;
}

function test (imagemagick) {
  if (imagemagick) return gm(dir + '/original.jpg').options({ imageMagick: true });
  return gm(dir + '/original.jpg');
}

function finish (filename) {
  return function (err) {
    if (err) throw err;

    --pending;
    process.stdout.write('\033[2K');
    process.stdout.write('\033[0G');
    process.stdout.write('pending ' + pending);
    if (pending) return;

    process.stdout.write('\033[?25h');
    process.stdout.write('\033[2K');
    process.stdout.write('\033[0G');
    var leaks = gleak.detect();
    assert.equal(0, leaks.length, "global leaks detected: " + leaks);
    console.error("\n\u001B[32mAll tests passed\u001B[0m");
  }
}

process.stdout.write('\033[?25l');

files.forEach(function (file) {
  var filename = __dirname + '/' + file;
  require(filename)(test(), dir, finish(filename), gm);
  require(filename)(test(true), dir, finish(filename), gm);
});

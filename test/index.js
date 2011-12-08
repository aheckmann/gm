
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var dir = __dirname + '/../examples/imgs';
var gm = require('../');
var assert = require('assert');
var gleak = require('gleak');
var fs = require('fs');

var files = fs.readdirSync(__dirname).filter(filter);
var pending, total = pending = files.length;

function filter (file) {
  if (!/\.js$/.test(file)) return false;
  if ('index.js' === file) return false;

  var filename = __dirname + '/' + file;
  if (!fs.statSync(filename).isFile()) return false;
  return true;
}

function test () {
  return gm(dir + '/original.jpg');
}

function testIM () {
	return gm(dir + '/original.jpg', 'convert');
}

function finish (filename) {
  return function (err) {
    if (err) {
		console.log(filename);
		throw new Error(err);
	}

    --pending;
    process.stderr.write(
        '\u001B[30m'
      + (new Array(total - pending)).join('√')
      + '\u001B[0m'
      + '\u001B[30m'
      + (new Array(pending)).join('░')
      + '\u001B[0m'
      + '\r'
    );

    if (pending) return;

    var leaks = gleak.detect();
    assert.equal(0, leaks.length, "global leaks detected: " + leaks);
    console.error("\n\u001B[32mAll tests passed\u001B[0m")
  }
}

files.forEach(function (file) {
  var filename = __dirname + '/' + file;

  if (process.argv[2] && process.argv[2] == "im") {
	require(filename)(testIM(), dir, finish(filename), gm);
  } else {
	require(filename)(test(), dir, finish(filename), gm);
  }
});

const cp = require('child_process');
const path = require('path');
const Async = require('async');
const dir = path.join(__dirname, '..', 'examples', 'imgs');
const gm = require('..');
const fs = require('fs');

const only = process.argv.slice(2);
gm.integration = !! ~process.argv.indexOf('--integration');
if (gm.integration) only.shift();

let files = fs.readdirSync(__dirname).filter(filter);
if (files.length === 0) {
  console.log('No tests found matching', only);
}

function filter (file) {
  if (!/\.js$/.test(file)) return false;
  if ('index.js' === file) return false;
  if (only.length && !~only.indexOf(file)) return false;

  var filename = path.join(__dirname, file);
  if (!fs.statSync(filename).isFile()) return false;
  return true;
}

const originalPathName = path.join(dir, 'original.jpg');

function test (imageMagick) {
  if (imageMagick) {
    return gm(originalPathName).options({ imageMagick });
  }

  return gm(originalPathName);
}

function finish (filename) {
  return function (err) {
    if (err) {
      console.error('\n\nError occured with file: ' + filename);
      throw err;
    }

    process.stdout.write('\033[2K');
    process.stdout.write('\033[0G');
    process.stdout.write('pending ' + (q.length()+q.running()));
  }
}

function isMagickInstalled() {
  try {
    cp.execSync('magick -version');
    return true;
  } catch (_) {
    return false;
  }
}

process.stdout.write('\033[?25l');

var q = Async.queue(function (task, callback) {
  var filename = task.filename;
  var im = task.imagemagick;

  require(filename)(test(im), dir, function (err) {
    finish(filename)(err);
    callback();
  }, gm, im);
}, 1);

q.drain = function(){
  process.stdout.write('\033[?25h');
  process.stdout.write('\033[2K');
  process.stdout.write('\033[0G');
  console.error("\n\u001B[32mAll tests passed\u001B[0m");
};

files = files.map(function (file) {
  return path.join(__dirname, file);
});

files.forEach(function (filename) {
  q.push({
    imagemagick: false,
    filename
  })
});

files.forEach(function (filename) {
  q.push({
    imagemagick: true,
    filename
  })
});

if (isMagickInstalled()) {
  console.log('magick is installed');

  files.forEach(function (filename) {
    q.push({
      imagemagick: '7+',
      filename
    })
  });
}
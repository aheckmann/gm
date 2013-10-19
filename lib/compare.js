// compare

var exec = require('child_process').exec;
var utils = require('./utils');

/**
 * Compare two images uses graphicsmagicks `compare` command.
 *
 * gm.compare(img1, img2, 0.4, function (err, equal, equality) {
 *   if (err) return handle(err);
 *   console.log('The images are equal: %s', equal);
 *   console.log('There equality was %d', equality);
 * });
 *
 * @param {String} orig Path to an image.
 * @param {String} compareTo Path to another image to compare to `orig`.
 * @param {Number} [tolerance] Amount of difference to tolerate before failing - defaults to 0.4
 * @param {Function} cb(err, Boolean, equality, rawOutput)
 */

module.exports = exports = function compare (orig, compareTo, tolerance, cb) {
  orig = utils.escape(orig);
  compareTo = utils.escape(compareTo);

  // outputting the diff image
  if (typeof tolerance === 'object') {
    var diffOptions = tolerance;
    if (typeof diffOptions.file !== 'string') {
      throw new TypeError('The path for the diff output is invalid');
    }
    // graphicsmagick defaults to red
    var highlightColorOption = diffOptions.highlightColor
      ? ' -highlight-color ' + diffOptions.highlightColor + ' '
      : ' ';

    return exec('gm compare' + highlightColorOption + orig + ' ' + compareTo +
      ' -file ' + utils.escape(diffOptions.file), cb);
  }

  // else, output the mean square error (mse)
  if ('function' == typeof tolerance) {
    cb = tolerance;
    tolerance = 0.4;
  }

  exec('gm compare -metric mse ' + orig + ' ' + compareTo, function (err, stdout, stderr) {
    if (err) return cb(err);

    var match = /Total: (\d+\.?\d*)/m.exec(stdout);
    if (!match) {
      err = new Error('Unable to parse output.\nGot ' + stdout);
      return cb(err);
    }

    var equality = parseFloat(match[1]);
    cb(null, equality <= tolerance, equality, stdout);
  });
}

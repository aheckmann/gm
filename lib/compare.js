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

module.exports = exports = function (proto) {
  function compare(orig, compareTo, tolerance, cb) {
    orig = utils.escape(orig);
    compareTo = utils.escape(compareTo);

    var isImageMagick = this._options && this._options.imageMagick;
    // compare binary for IM is `compare`, for GM it's `gm compare`
    var bin = isImageMagick ? '' : 'gm ';

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
      var diffFilename = utils.escape(diffOptions.file);
      // For IM, filename is the last argument. For GM it's `-file <filename>`
      var diffOpt = isImageMagick ? diffFilename : ('-file ' + diffFilename);
      var cmd = bin + 'compare' + highlightColorOption + orig + ' ' + compareTo +
        ' ' + diffOpt;

      return exec(cmd, function (err, stdout, stderr) {
        // ImageMagick returns err code 2 if err, 0 if similar, 1 if dissimilar
        if (isImageMagick && err && err.code === 1) {
          err = null;
        }
        return cb(err, stdout, stderr);
      });
    }

    // else, output the mean square error (mse)
    if ('function' == typeof tolerance) {
      cb = tolerance;
      tolerance = 0.4;
    }

    var execCmd = bin + 'compare -metric mse ' + orig + ' ' + compareTo;
    // For ImageMagick diff file is required but we don't care about it, so null it out
    isImageMagick && (execCmd += ' null:');

    exec(execCmd, function (err, stdout, stderr) {
      // ImageMagick returns err code 2 if err, 0 if similar, 1 if dissimilar
      if (isImageMagick) {
        if (!err) {
          return cb(null, 0 <= tolerance, 0, stdout);
        }
        if (err.code === 1) {
          err = null;
          stdout = stderr;
        }
      }
      if (err) {
        return cb(err);
      }
      // Since ImageMagick similar gives err code 0 and no stdout, there's really no matching
      // Otherwise, output format for IM is `12.00 (0.123)` and for GM it's `Total: 0.123`
      var regex = isImageMagick ? /\((\d+\.?\d*)\)/m : /Total: (\d+\.?\d*)/m;
      var match = regex.exec(stdout);
      if (!match) {
        err = new Error('Unable to parse output.\nGot ' + stdout);
        return cb(err);
      }

      var equality = parseFloat(match[1]);
      cb(null, equality <= tolerance, equality, stdout);
    });
  }

  if (proto) {
    proto.compare = compare;
  }
  return compare;
};


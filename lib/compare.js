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
 * @param {Number|Object} [options] Options object or the amount of difference to tolerate before failing - defaults to 0.4
 * @param {Function} cb(err, Boolean, equality, rawOutput)
 */

module.exports = exports = function (proto) {
  function compare(orig, compareTo, options, cb) {
    orig = utils.escape(orig);
    compareTo = utils.escape(compareTo);

    var isImageMagick = this._options && this._options.imageMagick;
    // compare binary for IM is `compare`, for GM it's `gm compare`
    var bin = isImageMagick ? '' : 'gm ';
    var execCmd = bin + 'compare -metric mse ' + orig + ' ' + compareTo;
    var tolerance = 0.4
    // outputting the diff image
    if (typeof options === 'object') {
      if (options.file) {
        if (typeof options.file !== 'string') {
          throw new TypeError('The path for the diff output is invalid');
        }
         // graphicsmagick defaults to red
        var highlightColorOption = options.highlightColor
          ? ' -highlight-color ' + options.highlightColor + ' '
          : ' ';
        var highlightStyleOption = options.highlightStyle
          ? ' -highlight-style ' + options.highlightStyle + ' '
          : ' ';
        var diffFilename = utils.escape(options.file);
        // For IM, filename is the last argument. For GM it's `-file <filename>`
        var diffOpt = isImageMagick ? diffFilename : ('-file ' + diffFilename);
        execCmd += highlightColorOption + highlightStyleOption  + ' ' + diffOpt;
      }
      
      if (options.tolerance) {
        if (typeof options.tolerance !== 'number') {
          throw new TypeError('The tolerance value should be a number');
        }
        tolerance = options.tolerance;
      } 
    } else {
      // For ImageMagick diff file is required but we don't care about it, so null it out
      isImageMagick && (execCmd += ' null:');

      if (typeof options == 'function') {
        cb = options; // tolerance value not provided, flip the cb place
      } else {
        tolerance = options
      }
    }

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
      var regex = isImageMagick ? /\((\d+\.?[\d\-\+e]*)\)/m : /Total: (\d+\.?\d*)/m;
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


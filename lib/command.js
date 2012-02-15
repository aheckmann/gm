// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var utils = require('./utils');

/**
 * Extend proto
 */

module.exports = function (proto) {

  function args (prop) {
    return function args () {
      var len = arguments.length;
      var a = [];
      var i = 0;

      for (; i < len; ++i) {
        a.push(arguments[i]);
      }

      this[prop] = this[prop].concat(a);
      return this;
    }
  }

  proto.in = args('_in');
  proto.out = args('_out');

  proto._preprocessor = [];
  proto.preprocessor = args('_preprocessor');

  /**
   * Execute the command and write the image to the specified file name.
   *
   * @param {String} name
   * @param {Function} callback
   * @return {Object} gm
   */

  proto.write = function write (name, callback) {
    if (!callback) callback = name, name = null;

    if ("function" !== typeof callback) {
      throw new TypeError("gm().write() expects a callback function")
    }

    if (!name) {
      return callback(TypeError("gm().write() expects a filename when writing new files"));
    }

    this.outname = name;

    var self = this;
    this._preprocess(function (err) {
      if (err) return callback(err);
      self._spawn(self.args(), true, callback);
    });
  }

  /**
   * Execute the command and return stdin and stderr ReadableStreams providing the image data.
   *
   * @param {Function} callback
   * @return {Object} gm
   */

  proto.stream = function stream (format, callback) {
    if (!callback) callback = format, format = null;

    if ("function" !== typeof callback) {
      throw new TypeError("gm().stream() expects a callback function")
    }

    if (format) {
      format = format.split('.').slice(-1)[0].toUpperCase();
      this.outname = format + ":-";
    }

    var self = this;
    this._preprocess(function (err) {
      if (err) return callback(err);
      return self._spawn(self.args(), false, callback);
    });
  }

  /**
    * Run any preProcessor functions in series. Used by autoOrient.
    *
    * @param {Function} callback
    * @return {Object} gm
    */

  proto._preprocess = function _preprocess (callback) {
    if (!this._preprocessor.length) return callback();

    // execute preprocessors in series
    var self = this
      , series = this._preprocessor.map(wrapSeries);

    var fn = series.shift();
    if (fn) fn();

    function wrapSeries (func) {
      return function () {
        func.call(self, function (err) {
          if (err) {
            series = self = func = null;
            return callback(err);
          }

          var fn = series.shift();
          if (fn) return fn();

          series = self = func = null;
          callback();
        });
      };
    };
  }

  /**
    * Execute the command, buffer input and output, return stdout and stderr buffers.
    *
    * @param {String} bin
    * @param {Array} args
    * @param {Function} callback
    * @return {Object} gm
    */

  proto._exec = function _exec (args, callback) {
    return this._spawn(args, true, callback);
  }

  /**
    * Execute the command with stdin, returning stdout and stderr streams or buffers.
    *
    * @param {String} bin
    * @param {Array} args
    * @param {ReadableStream} stream
    * @param {Boolean} shouldBuffer
    * @param {Function} callback
    * @return {Object} gm
    */

  proto._spawn = function _spawn (args, bufferOutput, callback) {
    var bin = this._options.imageMagick
      ? args.shift()
      : 'gm'

    var proc = spawn(bin, args)
      , cmd = bin + ' ' + args.map(utils.escape).join(' ')
      , self = this
      , err;

    // pipe in the sourceStream if present
    if (self.sourceStream) {

      if (!self.sourceStream.readable && !self.bufferStream) {
        err = new Error("gm().stream() or gm().write() with a non-readable " +
                        "stream. Pass \"{bufferStream: true}\" to identify() " +
                        "or getter (size, format, etc...)");
        return callback.call(this, err);
      }

      self.sourceStream.pipe(proc.stdin);

      // resume any buffered events from a previous identify operation
      if (self.buffer) {
        self.buffer.resume();

      // if {bufferStream: true} was passed to an identify operation,
      // we buffer the input stream events so we can use them again
      } else if (self.bufferStream) {
        self.buffer = utils.buffer(self.sourceStream);
      }
    }

    // for _exec operations (identify() mostly), we also
    // need to buffer the output stream before returning
    if (bufferOutput) {
      var stdout = ''
        , stderr = ''
        , onOut
        , onErr
        , onExit

      proc.stdout.addListener('data', onOut = function (data) {
        stdout += data;
      });

      proc.stderr.addListener('data', onErr = function (data) {
        stderr += data;
      });

      proc.addListener('exit', onExit = function (code, signal) {
        if (code !== 0 || signal !== null) {
          err = new Error('Command failed: ' + stderr);
          err.code = code;
          err.signal = signal;
        };
        callback.call(this, err, stdout, stderr, cmd);
        stdout = stderr = onOut = onErr = onExit = null;
      });
    } else {
      callback.call(this, null, proc.stdout, proc.stderr, cmd);
    }

    return this;
  }

  proto.args = function args () {
    var source = (this.sourceStream ? "-" : this.source);
    if (source && this.sourceFrames) source += this.sourceFrames;

    var outname = this.outname || "-";
  	if (this._outputFormat) outname = this._outputFormat + ':' + outname;

    return [].concat(
       'convert'
      , this._in
      , source
      , this._out
      , outname
    ).filter(Boolean); // remove falsey
  }

  /**
   * Image types.
   */

  var types = {
      'jpg': /\.jpe?g$/i
    , 'png' : /\.png$/i
    , 'gif' : /\.gif$/i
    , 'tiff': /\.tif?f$/i
    , 'bmp' : /(?:\.bmp|\.dib)$/i
    , 'webp': /\.webp$/i
  };

  types.jpeg = types.jpg;
  types.tif = types.tiff;
  types.dib = types.bmp;

  /**
   * Determine the type of source image.
   *
   * @param {String} type
   * @return {Boolean}
   * @example
   *   if (this.inputIs('png')) ...
   */

  proto.inputIs = function inputIs (type) {
    if (!type) return false;

    var rgx = types[type];
    if (!rgx) {
      if ('.' !== type[0]) type = '.' + type;
      rgx = new RegExp('\\' + type + '$', 'i');
    }

    return rgx.test(this.source);
  }
}

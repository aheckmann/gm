
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

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

  proto._in = [];
  proto.in = args('_in');

  proto._out = [];
  proto.out = args('_out');

  /**
   * Execute the command and write the image to the specified file name.
   *
   * @param {String} name
   * @param {Function} callback
   * @return {Object} gm
   */
  
  proto.write = function write (name, callback) {
    if (!callback) callback = name, name = null;

    if (typeof callback !== "function") {
      throw new TypeError("gm().write() expects a callback function")
    }

    if (!name) {
      throw new TypeError("gm().write() expects a filename when writing new files")
    }

    this.outname = name;

    return this._spawn("gm", this.args(), this.sourceStream, true, callback);
  }

  /**
   * Execute the command and return stdin and stderr ReadableStreams providing the image data.
   *
   * @param {Function} callback
   * @return {Object} gm
   */

  proto.stream = function stream (callback) {
    if (typeof callback !== "function") {
      throw new TypeError("gm().stream() expects a callback function")
    }

    var self = this;

    return this._spawn("gm", this.args(), this.sourceStream, false, callback);
  }

  /**
    * Execute the command, returning stdout and stderr buffers.
    *
    * @param {String} bin
    * @param {Array} args
    * @param {Function} callback
    * @return {Object} gm
    */

  proto._exec = function _exec (bin, args, callback) {
    return this._spawn(bin, args, null, true, callback);
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

  proto._spawn = function _spawn (bin, args, stream, shouldBuffer, callback) {
    var proc = spawn(bin, args);

    var cmd = bin + " " + args.join(' ');

    if(stream) {
      stream.pipe(proc.stdin);
    }

    if(shouldBuffer) {
      var stdout = ''
        , stderr = '';

      proc.stdout.addListener('data', function(data) {
        stdout += data;
      });

      proc.stderr.addListener('data', function(data) {
        stderr += data;
      });

      proc.addListener('exit', function(code, signal) {
        var err = null;

        if(code !== 0 || signal !== null) {
          var e = new Error('Command failed: ' + stderr);
          e.code = code;
          e.signal = signal;
        };
        callback.call(this, err, stdout, stderr, cmd);
      });
    } else {
      callback.call(this, null, proc.stdout, proc.stderr, cmd);
    }

    return this;
  }

  proto.args = function args () {
    return [].concat(
                'convert'
              , this._in
              , this.sourceStream ? "-" : this.source
              , this._out
              , this.outname || "-"
            );
  }

  /**
   * Image types.
   */

  var types = {
      'jpg': /[\.jpg|\.jpeg]$/i
    , 'png' : /\.png$/i
    , 'gif' : /\.gif$/i
    , 'tiff': /[\.tiff|\.tif]$/i
    , 'bmp' : /[\.bmp|\.dib]$/i
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

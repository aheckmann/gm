
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

    return this._spawn("gm", this.args(), true, callback);
  }

  /**
   * Execute the command and return stdin and stderr ReadableStreams providing the image data.
   *
   * @param {Function} callback
   * @return {Object} gm
   */

  proto.stream = function stream (format, callback) {
    if(!callback) callback = format, format = null;

    if (typeof callback !== "function") {
      throw new TypeError("gm().stream() expects a callback function")
    }

    if(format) {
      format = format.split('.').slice(-1)[0].toUpperCase();
      this.outname = format + ":-";
    }

    return this._spawn("gm", this.args(), false, callback);
  }

  /**
    * Execute the command, buffer input and output, return stdout and stderr buffers.
    *
    * @param {String} bin
    * @param {Array} args
    * @param {Function} callback
    * @return {Object} gm
    */

  proto._exec = function _exec (bin, args, callback) {
    return this._spawn(bin, args, true, callback);
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

  proto._spawn = function _spawn (bin, args, bufferOutput, callback) {
    var proc = spawn(bin, args)
      , cmd = bin + " " + args.map(utils.escape).join(' ')
      , self = this;

    // pipe in the sourceStream if present
    if(self.sourceStream) {

      if(!self.sourceStream.readable && !self.bufferStream) {
        throw new Error("gm().stream() or gm().write() with a non-readable " +
                        "stream. Pass \"{bufferStream: true}\" to identify() " +
                        "or getter (size, format, etc...)");
      }

      self.sourceStream.pipe(proc.stdin);

      // resume any buffered events from a previous step
      if(self.buffer) {
        self.buffer.resume();

      // if this isn't the last step, we need to buffer the
      // events on the input stream so we can use them again
      } else if(self.bufferStream) {
        self.buffer = utils.buffer(self.sourceStream);
      }
    }

    // sometimes we need to buffer the output stream too
    if(bufferOutput) {
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
          err = new Error('Command failed: ' + stderr);
          err.code = code;
          err.signal = signal;
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
            ).filter(function(arg) { return !!arg });
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

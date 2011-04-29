
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var escape = require('./utils').escape;

module.exports = function (proto) {

  function args (prop) {
    return function args () {
      var len = arguments.length;
      var a = [];
      var i = 0;

      for (; i < len; ++i) {
        a.push(escape(arguments[i]));
      }

      this[prop] = this[prop].concat(a);
      return this;
    }
  }

  proto.in = args('_in');
  proto.out = args('_out');

  proto.write = function write (name, callback) {
    if (!callback) callback = name, name = null;

    if ("function" !== typeof callback) {
      throw new TypeError("gm().write() expects a callback function")
    }

    if (!name) {
      throw new TypeError("gm().write() expects a filename when writing new files")
    }

    if (name) {
      this.outname = escape(name);
    }

    return this._exec(this.cmd(), callback);
  }

  proto._exec = function _exec (cmd, callback) {
    var self = this;

    exec(cmd, function (err, stdout, stderr) {
      callback.call(self, err, stdout, stderr, cmd);
    });

    return self;
  }

  proto.cmd = function cmd () {
    return "gm convert "
           + this._in.join(" ")
           + " "
           + this.source
           + " "
           + this._out.join(" ")
           + " "
           + this.outname || this.source;
  }
}

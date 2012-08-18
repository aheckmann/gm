// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Extend proto.
 */

module.exports = function (gm) {

  var proto = gm.prototype;

  var map = {
      'size': 'size'
    , 'format': 'format'
    , 'depth': 'depth'
    , 'color': 'color'
    , 'orientation': 'Orientation'
    , 'res': 'Resolution'
    , 'filesize': 'Filesize'
  }

  Object.keys(map).forEach(function (getter) {
    proto[getter] = function (opts, callback) {
      if (!callback) callback = opts, opts = {};

      var key = map[getter]
        , self = this;

      if (self.data[key]) {
        callback.call(self, null, self.data[key]);
        return self;
      }

      self.identify(opts, function (err, stdout, stderr, cmd) {
        if (err) {
          return callback.call(self, err, stdout, stderr, cmd);
        }

        callback.call(self, null, self.data[key]);
      });

      return self;
    }
  });

  proto.identify = function identify (opts, callback) {
    if (!callback) callback = opts, opts = {};

    var self = this;

    if (!callback) return self;

    self.bufferStream = !! opts.bufferStream;

    if (self._identifying) {
      self._iq.push(callback);
      return self;
    }

    if (Object.keys(self.data).length) {
      callback.call(self, null, self.data);
      return self;
    }

    self._iq = [callback];
    self._identifying = true;

    var args = [
        'identify'
      , '-ping'
      , '-verbose'
      , self.sourceStream ? '-' : self.source
    ];

    self._exec(args, function (err, stdout, stderr, cmd) {
      if (err) {
        return callback.call(self, err, stdout, stderr, cmd);
      }

      stdout = (stdout||"").trim().replace(/\r\n|\r/g, "\n");

      var parts = stdout.split("\n");

      // skip the first line (its just the filename)
      parts.shift();

      try {
        var len = parts.length
          , rgx1 = /^( *)(.+): (.*)$/ // key: val
          , rgx2 = /^( *)(.+):$/      // key: begin nested object
          , out = { indent: {} }
          , level = null
          , lastkey
          , i = 0
          , res
          , o

        for (; i < len; ++i) {
          res = rgx1.exec(parts[i]) || rgx2.exec(parts[i]);
          if (!res) continue

          var indent = res[1].length
            , key = res[2] ? res[2].trim() : '';

          if ('Image' == key) continue;

          var val = res[3] ? res[3].trim() : null;

          // first iteration?
          if (null === level) {
            level = indent
            o = out.root = out.indent[level] = self.data;
          } else if (indent < level) {
            // outdent
            if (!(indent in out.indent)) {
              continue;
            }
            o = out.indent[indent];
          } else if (indent > level) {
            // dropping into a nested object
            out.indent[level] = o;
            // wierd format, key/val pair with nested children. discard the val
            o = o[lastkey] = {};
          }

          level = indent;

          if (val) {
            o[key] = val;

            if (key in helper) {
              helper[key](o, val);
            }
          }

          lastkey = key;
        }

      } catch (err) {
        err.message = err.message + "\n\n  Identify stdout:\n  " + stdout
        throw err;
      }

      var idx = self._iq.length;

      while (idx--) {
        self._iq[idx].call(self, null, self.data);
      }

      self._identifying = false;
    });

    return self;
  }

  /**
   * helpers.
   */

  var helper = gm.identifyHelpers = {};

  helper.Geometry = function Geometry (o, val) {
    var split = val.split("x");
    o.size = {
        width:  parseInt(split[0], 10)
      , height: parseInt(split[1], 10)
    }
  };

  helper.Format = function Format (o, val) {
    o.format = val.split(" ")[0];
  };

  helper.Depth = function Depth (o, val) {
    o.depth = parseInt(val, 10);
  };

  helper.Colors = function Colors (o, val) {
    o.color = parseInt(val, 10);
  };
}

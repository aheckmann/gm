/**
 * Extend proto.
 */

module.exports = function (gm) {

  var proto = gm.prototype;

  /**
   * `identify` states
   */

  const IDENTIFYING = 1;
  const IDENTIFIED = 2;

  /**
   * Map getter functions to output names.
   *
   * - format: specifying the -format argument (see man gm)
   * - verbose: use -verbose instead of -format (only if necessary b/c its slow)
   * - helper: use the conversion helper
   */

  var map = {
      'format': { key: 'format', format: '%m' }
    , 'depth':  { key: 'depth',  format: '%q' }
    , 'filesize': { key: 'Filesize', format: '%b' }
    , 'size':  { key: 'size', format: '%wx%h ', helper: 'Geometry' }
    , 'color': { key: 'color', format: '%k',  helper: 'Colors' }
    , 'orientation': { key: 'Orientation', verbose: true }
    , 'res':   { key: 'Resolution', verbose: true }
  }

  /**
   * Getter functions
   */

  Object.keys(map).forEach(function (getter) {
    proto[getter] = function (opts, callback) {
      if (!callback) callback = opts, opts = {};
      if (!callback) return this;

      var val = map[getter]
        , key = val.key
        , self = this;

      if (self.data[key]) {
        callback.call(self, null, self.data[key]);
        return self;
      }

      self.on(getter, callback);

      self.bufferStream = !!opts.bufferStream;

      if (val.verbose) {
        self.identify(opts, function (err, stdout, stderr, cmd) {
          if (err) {
            self.emit(getter, err, self.data[key], stdout, stderr, cmd);
          } else {
            self.emit(getter, err, self.data[key]);
          }
        });
        return self;
      }

      var args = makeArgs(self, val);
      self._exec(args, function (err, stdout, stderr, cmd) {
        if (err) {
          self.emit(getter, err, self.data[key], stdout, stderr, cmd);
          return;
        }

        var result = (stdout||'').trim();

        if (val.helper in helper) {
          helper[val.helper](self.data, result);
        } else {
          self.data[key] = result;
        }

        self.emit(getter, err, self.data[key]);
      });

      return self;
    }
  });

  /**
   * identify command
   *
   * Overwrites all internal data with the parsed output
   * which is more accurate than the fast shortcut
   * getters.
   */

  proto.identify = function identify (opts, callback) {
    if (!callback) callback = opts, opts = {};
    if (!callback) return this;

    var self = this;

    if (IDENTIFIED === self._identifyState) {
      callback.call(self, null, self.data);
      return self;
    }

    self.on('identify', callback);

    if (IDENTIFYING === self._identifyState) {
      return self;
    }

    self._identifyState = IDENTIFYING;

    self.bufferStream = !!opts.bufferStream;

    var args = makeArgs(self, { verbose: true });

    self._exec(args, function (err, stdout, stderr, cmd) {
      if (err) {
        self.emit('identify', err, self.data, stdout, stderr, cmd);
        return;
      }

      err = parse(stdout, self);

      if (err) {
        self.emit('identify', err, self.data, stdout, stderr, cmd);
        return;
      }

      self.data.path = self.source;

      self.emit('identify', null, self.data);
      self._identifyState = IDENTIFIED;
    });

    return self;
  }

  /**
   * Parses `identify` responses.
   *
   * @param {String} stdout
   * @param {Gm} self
   * @return {Error} [optionally]
   */

  function parse (stdout, self) {
    // normalize
    var parts = (stdout||"").trim().replace(/\r\n|\r/g, "\n").split("\n");

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
        if (!res) continue;

        var indent = res[1].length
          , key = res[2] ? res[2].trim() : '';

        if ('Image' == key) continue;

        var val = res[3] ? res[3].trim() : null;

        // first iteration?
        if (null === level) {
          level = indent;
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
      err.message = err.message + "\n\n  Identify stdout:\n  " + stdout;
      return err;
    }
  }

  /**
   * Create an argument array for the identify command.
   *
   * @param {gm} self
   * @param {Object} val
   * @return {Array}
   */

  function makeArgs (self, val) {
    var args = [
        'identify'
      , '-ping'
    ];

    if (val.format) {
      args.push('-format', val.format);
    }

    if (val.verbose) {
      args.push('-verbose');
    }

    args.push(self.sourceStream || self.sourceBuffer ? '-' : self.source);
    return args;
  }

  /**
   * identify -verbose helpers
   */

  var helper = gm.identifyHelpers = {};

  helper.Geometry = function Geometry (o, val) {
    // We only want the size of the first frame.
    // Each frame is separated by a space.
    var split = val.split(" ").shift().split("x");
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

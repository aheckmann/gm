
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Extend proto.
 */

module.exports = function (proto) {

;['size', 'format', 'depth', 'color', 'res', 'filesize'].forEach(function (getter) {

  proto[getter] = function (callback) {
    var self = this;

    if (self.data[getter]) {
      callback.call(self, null, self.data[getter]);
      return self;
    }

    self.identify(function (err, stdout, stderr, cmd) {
      if (err) {
        return callback.call(self, err, stdout, stderr, cmd);
      }

      callback.call(self, null, self.data[getter]);
    });

    return self;
  }
});

proto.identify = function identify (callback) {
  var self = this;

  if (!callback) return self;

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

  var cmd = "gm identify -ping -verbose " + self.source;

  self._exec(cmd, function (err, stdout, stderr) {
    if (err) {
      return callback.call(self, err, stdout, stderr, cmd);
    }

    stdout = (stdout||"").trim().replace(/\r\n|\r/g, "\n");

    var parts = stdout.split("\n")
      , len = parts.length
      , rgx = /^( *)(.*)/
      , data = self.data
      , result
      , keyval
      , i = 0;

    var handle = {};

    handle.Geometry = function Geometry (val) {
      var split = val.split("x");
      data.size = {
          width:  parseInt(split[0], 10)
        , height: parseInt(split[1], 10)
      }
    };

    handle.Format = function Format (val) {
      data.format = val.split(" ")[0];
    };

    handle.Depth = function Depth (val) {
      data.depth = parseInt(val, 10);
    };

    handle.Colors = function Colors (val) {
      data.color = parseInt(val, 10);
    };

    handle.Resolution = function Resolution (val) {
      data.res = val;
    };

    handle.Filesize = function Filesize (val) {
      data.filesize = val;
    };

    for (; i < len; ++i) {
      result = rgx.exec(parts[i]);
      if (!result) continue;
      if (2 !== result[1].length) continue;

      var keyval = result[2].split(":");
      if (keyval.length <= 1) continue;

      if (keyval[0] in handle) {
        handle[keyval[0]](keyval[1].trim());
      } else {
        data[keyval[0]] = keyval[1].trim();
      }
    }

    var idx = self._iq.length;

    while (idx--) {
      self._iq[idx].call(self, null, self.data);
    }

    self._identifying = false;
  });

  return self;
}}

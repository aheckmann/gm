
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Escape the given shell `arg`.
 *
 * @param {String} arg
 * @return {String}
 * @api public
 */

exports.escape = function escape (arg) {
  return '"' + String(arg).trim().replace(/"/g, '\\"') + '"';
}

/**
 * Buffer `data` and `end` events from the given stream `obj`.
 *
 * @param {Stream} obj
 * @api public
 */

// __Attribution:__ Taken from node-http-proxy's stream buffer implementation
// https://github.com/nodejitsu/node-http-proxy/blob/9f05e6c567/lib/node-http-proxy.js#L223-256
// https://github.com/nodejitsu/node-http-proxy/blob/9f05e6c567/LICENSE

exports.buffer = function (obj) {
  var events = []
    , onData
    , onEnd;

  obj.on('data', onData = function (data, encoding) {
    events.push(['data', data, encoding]);
  });

  obj.on('end', onEnd = function (data, encoding) {
    events.push(['end', data, encoding]);
  });

  return {
    end: function () {
      obj.removeListener('data', onData);
      obj.removeListener('end', onEnd);
    }
  , destroy: function () {
      this.end();
      this.resume = function () {
        console.error("Cannot resume buffer after destroying it.");
      };

      onData = onEnd = events = obj = null;
    }
  , resume: function () {
      this.end();
      for (var i = 0, len = events.length; i < len; ++i) {
        obj.emit.apply(obj, events[i]);
      }
    }
  };
};

exports.argsToArray = function (args) {
  var arr = [];

  for (var i = 0; i <= arguments.length; i++) {
    if ('undefined' != typeof arguments[i])
      arr.push(arguments[i]);
  }

  return arr;
}

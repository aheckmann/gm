
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

exports.argsToArray = function (args) {
  var arr = [];

  for (var i = 0; i <= arguments.length; i++) {
    if ('undefined' != typeof arguments[i])
      arr.push(arguments[i]);
  }

  return arr;
}

exports.streamToBuffer = function (stream, callback) {
  var buffers = [];
  var done = false;

  stream.on('data', function (chunk) {
    buffers.push(chunk);
  })

  stream.on('error', function (err) {
    done = true;
    callback(err);
  })

  stream.on('end', function () {
    if (done) return;

    callback(null, Buffer.concat(buffers));
  })
}
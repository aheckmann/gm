
/**
 * Escape the given shell `arg`.
 *
 * @param {String} arg
 * @return {String}
 * @api public
 */

exports.escape = function escape (arg) {
  return '"' + String(arg).trim().replace(/"/g, '\\"') + '"';
};

exports.unescape = function escape (arg) {
    return String(arg).trim().replace(/"/g, "");
};

exports.argsToArray = function (args) {
  var arr = [];

  for (var i = 0; i <= arguments.length; i++) {
    if ('undefined' != typeof arguments[i])
      arr.push(arguments[i]);
  }

  return arr;
};

/**
 * Search case-insensitively for an allowed value, return default value if not found
 */
exports.validateValue = function (value, allowedValues, defaultValue) {
  value = String(value || '').toLowerCase();

  for (var i = 0, l = allowedValues.length; i <= l; i++) {
    if (allowedValues[i] && allowedValues[i].toLowerCase() === value) {
      return allowedValues[i];
    }
  }

  return defaultValue;
};
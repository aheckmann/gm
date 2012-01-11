
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = exports = function (proto) {
  proto._options = {};

  proto.options = function setOptions (options) {
    var keys = Object.keys(options)
      , i = keys.length
      , key

    while (i--) {
      key = keys[i];
      this._options[key] = options[key];
    }

    return this;
  }
}

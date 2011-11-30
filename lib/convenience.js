
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Extend proto
 */

module.exports = function (proto) {
  require("./convenience/thumb")(proto);
  require("./convenience/morph")(proto);
  require("./convenience/sepia")(proto);
  require("./convenience/autoOrient")(proto);
}

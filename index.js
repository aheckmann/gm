
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = gm

function gm(source, height, color){
  if (!(this instanceof gm))
    return new gm(source, height, color)

  this.data = {}
  this._in = []
  this._out = []

  var width

  if (height){
    // new images
    width = source
    source = ""
    this.arg(
      [ "-size", width + "x" + height ]
      .concat( color ? ['"xc:'+ color + '"'] : [] )
    )
  }

  this.source = source
}
  
require("./lib/getters")(gm.prototype)
require("./lib/args")(gm.prototype)
require("./lib/drawing")(gm.prototype)
require("./lib/convenience")(gm.prototype)
require("./lib/command")(gm.prototype)


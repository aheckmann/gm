
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = gm


function gm(source){
  if (!(this instanceof gm))
    return new gm(source)
  this.source = source
  this.data = {}
  this._in = []
  this._out = []
}
  

require("./lib/getters")(gm.prototype)
require("./lib/args")(gm.prototype)
require("./lib/drawing")(gm.prototype)
require("./lib/convenience")(gm.prototype)
require("./lib/command")(gm.prototype)

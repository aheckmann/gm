
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
  

require("./plugin/getters")(gm.prototype)
require("./plugin/args")(gm.prototype)
require("./plugin/thumb")(gm.prototype)
require("./plugin/command")(gm.prototype)

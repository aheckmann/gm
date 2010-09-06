
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = module.parent.exports

gm.new = function(width, height, color){
  var ret = gm().arg(
    [ "-size", width + "x" + height ]
    .concat( color ? ['"xc:'+ color + '"'] : [] )
  )
  ret._isnew = true
  return ret
}


// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function(proto){
  
  proto.sepia = function(){
    return this.modulate(115, 0, 100).colorize(7, 21, 50) 
  }

}

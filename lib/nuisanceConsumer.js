//issues/820 

module.exports = exports = {}; 
exports.isNuisance = function(instring) {
 //console.log ("wat", instring.toString(), typeof(instring));
 // scan each emitted line, if it's an error line, remove it
//**** Error: stream operator isn't terminated by valid EOL.
 if( instring.toString().indexOf ("**** Error: stream operator isn't terminated by valid EOL.") > 1) { return 1 }
 return 0 ;
}                                                                                                                                                                                                                              

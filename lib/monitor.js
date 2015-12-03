// monitor

var utils = require('./utils');

/**
 * Provide basic user feedback when using .monitor(): pipe raw io from spawned process (broker CLI output so it's visible) and wrap inside comments (rough command count for entire job).
 * });
 *
 * @param {Array} commandsList Names of callable API functions
 * @param {Function} enableMonitor(flag) Trigger the output
 * @param {Function} addMonitorCommand(proc) Check if arg/flag is callable and save
 */

//TODO
/*
-Problem here is we cannot access progress information from bin, so best we can do (without string-fiddling - "*100%*" anyone?) is give a general idea of status / activity.
- Number of commands shown is not entirely accurate as switches are included (for now), and should not treated as part of the whole job. We could maintain a list of commands to include in args.js in future -this is a start.
*/

var commandsList = [];

module.exports = exports = function(proto) {

  proto.enableMonitor = function(proc) {

    //Pipe to main out
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    //don't count -monitor as command
    commandsList.splice(commandsList.indexOf('monitor'), 1);

    //List commands running in this job
    console.log('Processing ' + (commandsList.length - 1) + ' commands ' + '(' + commandsList.toString() + ',[+out])...');

    proc.on('exit', function(code) {
      console.log('...done.');
    });

  }

  //If flag (from args) is a callable function, keep track of it as a job progress.
  proto.addMonitorCommand = function(flag) {
    var flag = utils.lettersOnly(flag);
    if (!utils.isEmpty(flag) && (typeof(eval('this.' + flag)) === 'function')) {
      commandsList.push(flag);
      return flag;
    } else {
      return false;
    }
  };
};
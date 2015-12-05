// monitor

var utils = require('./utils');
var EventEmitter = require('events').EventEmitter;

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
- Number of commands shown is not entirely accurate as some CLI switches/flags are included which should not treated as part of the job. We could maintain a list of commands to include in args.js in future -this is a start.
*/

var commandsList = [];
var enable = false;
var jobProgress = 1;
var progressEmitter = new EventEmitter();

module.exports = exports = function(proto) {

  proto.initMonitoring = function() {

    progressEmitter.setMaxListeners(0); //Suppress test warnings

    /* Command events */
    this.on('flagAdded', function(flag) {
      this.addMonitorCommand(flag);
    });

    this.on('processSpawned', function(proc) {
      if (enable) {
        this.enableMonitor(proc);
      }
    });

    /*Job progress events */
    progressEmitter.once('jobStart', function() {
      //List all commands running in job
      process.stdout.write('Processing ' + commandsList.length +
        ' commands ' + '(' + commandsList.toString() + ',[+out])...\r\n');
    });

    progressEmitter.on('jobProgress', function(data) {
      if (data.toString().indexOf('100%') > -1 &&
        jobProgress <= commandsList.length) {
        jobProgress++;
      }
    });

    progressEmitter.on('jobComplete', function() {
      if (jobProgress >= commandsList.length) {
        process.stdout.write('...done.\r\n');
      }
    });

  }

  proto.enableMonitor = function(proc) {

    progressEmitter.emit('jobStart');

    //Pipe to main out
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    //Trigger job progress events
    proc.stderr.on('data', function(data) {
      progressEmitter.emit('jobProgress', data);
    });

    proc.on('exit', function(code) {
      setTimeout(function() {
        progressEmitter.emit('jobComplete');
      }, 0)
    });

  }

  //If flag (from args) is a callable function, keep track of it as a progress step.
  proto.addMonitorCommand = function(flag) {
    var flag = utils.lettersOnly(flag);
    if (flag === "monitor") {
      enable = true;
    } else if (!utils.isEmpty(flag) && (typeof(eval('this.' + flag)) === 'function')) {
      commandsList.push(flag);
      return flag;
    } else {
      return false;
    }
  };
};
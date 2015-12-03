var assert = require('assert')

module.exports = function(_, dir, finish, gm) {

	assert.equal('append', gm.prototype.addMonitorCommand('append'));
	assert.equal(false, gm.prototype.addMonitorCommand('777'));
	finish();

}
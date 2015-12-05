
/**
 * Escape the given shell `arg`.
 *
 * @param {String} arg
 * @return {String}
 * @api public
 */

exports.escape = function escape(arg) {
	return '"' + String(arg).trim().replace(/"/g, '\\"') + '"';
};

exports.unescape = function escape(arg) {
	return String(arg).trim().replace(/"/g, "");
};

exports.lettersOnly = function(arg) {
	return String(arg).trim().replace(/[^A-Za-z]/ig, "");
};

exports.argsToArray = function(args) {
	var arr = [];

	for (var i = 0; i <= arguments.length; i++) {
		if ('undefined' != typeof arguments[i])
			arr.push(arguments[i]);
	}

	return arr;
};

exports.isUtil = function(v) {
	var ty = 'object';
	switch (Object.prototype.toString.call(v)) {
		case '[object String]':
			ty = 'String';
			break;
		case '[object Array]':
			ty = 'Array';
			break;
		case '[object Boolean]':
			ty = 'Boolean';
			break;
	}
	return ty;
}

exports.isEmpty = function(data) {
	if (typeof(data) == 'number' || typeof(data) == 'boolean') {
		return false;
	}
	if (typeof(data) == 'undefined' || data === null) {
		return true;
	}
	if (typeof(data.length) != 'undefined') {
		return data.length == 0;
	}
	var count = 0;
	for (var i in data) {
		if (data.hasOwnProperty(i)) {
			count++;
		}
	}
	return count == 0;
}
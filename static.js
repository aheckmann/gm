var connect = require('connect');

connect(
    connect.static(__dirname, { maxAge: 0 })
).listen(8888)

console.error('listening on http://localhost:8888');

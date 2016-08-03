var assert = require('assert');

module.exports = function (img, dir, finish, gm) {
  var EventEmitter = require('events').EventEmitter;
  EventEmitter.prototype._maxListeners = 100;

  assert.equal(undefined, gm.prototype._options.disposers);
  assert.equal(undefined, img._options.disposers);

  var emitter = new EventEmitter();

  var disposer = {
    emitter: emitter,
    events: ['pleaseDispose', 'readyToDispose']
  };

  var g = gm('test').options({ disposers: [ disposer ] });
  assert.deepEqual([disposer], g._options.disposers);

  var sub = gm.subClass({ disposers: [ disposer ]});
  assert.deepEqual([disposer], sub.prototype._options.disposers);

  if (!gm.integration) {
    return finish();
  }

  gm(dir + '/photo.JPG').options({ disposers: [ disposer ]})
  .thumb(1000, 1000, dir + '/dispose.png', function (err) {
    assert.ok(err, "Expecting a disposed error");
  });

  emitter.emit('pleaseDispose');

  noDispose();

  function noDispose() {
    gm(dir + '/photo.JPG').options({ disposers: [ disposer ]})
    .thumb(1000, 1000, dir + '/dispose.png', function (err) {
      finish(err);
    });
    emitter.emit('disposeOK');
  }
}

const assert = require('assert')
const path = require('path');

module.exports = function (img, dir, finish, gm, imageMagick) {
  var EventEmitter = require('events').EventEmitter;
  EventEmitter.prototype._maxListeners = 100;

  assert.equal(undefined, gm.prototype._options.disposers);
  assert.equal(undefined, img._options.disposers);

  var emitter = new EventEmitter();

  var disposer = {
    emitter: emitter,
    events: ['pleaseDispose', 'readyToDispose']
  };

  var g = gm('test').options({ disposers: [ disposer ], imageMagick });
  assert.deepEqual([disposer], g._options.disposers);

  var sub = gm.subClass({ disposers: [ disposer ], imageMagick });
  assert.deepEqual([disposer], sub.prototype._options.disposers);

  if (!gm.integration) {
    return finish();
  }

  const photoPath = path.join(dir, 'photo.JPG');
  const disposePath = path.join(dir, 'dispose.png');

  gm(photoPath).options({ disposers: [ disposer ], imageMagick })
  .thumb(1000, 1000, disposePath, function (err) {
    assert.ok(err, "Expecting a disposed error");
  });

  emitter.emit('pleaseDispose');

  noDispose();

  function noDispose() {
    gm(photoPath).options({ disposers: [ disposer ], imageMagick })
    .thumb(1000, 1000, disposePath, function (err) {
      finish(err);
    });
    emitter.emit('disposeOK');
  }
}

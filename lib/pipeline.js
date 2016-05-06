
module.exports = function (proto) {
  proto.pipeline = function () {
    if (!this._options.imageMagick) {
      throw new Error('Batching is not supported by GraphicsMagick');
    }

    var gm = new IMPipeline(this, arguments);
    gm.options(this._options);
    return gm;
  };

  function IMPipeline(parent, args) {
    proto.constructor.apply(this, args);
    this._pipeline = parent;
  }
  IMPipeline.prototype = Object.create(proto);

  IMPipeline.prototype.write = function (name) {
    this.out('-write', name);
    return this;
  }

  IMPipeline.prototype.clone = function (idx) {
    if (idx !== undefined) {
      this.in('-clone', idx.toString());
    } else {
      this.in('+clone');
    }
    return this;
  };

  IMPipeline.prototype.close = function () {
    this._pipeline.out('(');
    this._pipeline.out.apply(this._pipeline, this.args().slice(1, -1));
    this._pipeline.out(')');
    return this._pipeline;
  };
};

let hex2rgb = require('../lib/hex2rgb');
let assert = require('assert');

describe("hex2rgb - NodeJS assert", function () {
  it("should return an error if the value is not a hex code", function (done) {
    hex2rgb("blue", (err) => {
      assert(err);
      done();
    });

    // assert.throws(() => hex2rgb("blue"));
    // assert.throws(() => hex2rgb("red"));
    // assert.throws(() => hex2rgb("1234"));
    // assert.throws(() => hex2rgb(1234));
  });

  it("should return correct rgb value", function (done) {
    hex2rgb("#fff", (err, rgb) => {
      assert.strictEqual(err, null, "err to be null");
      assert.deepEqual(rgb, [255, 255, 255], "correct value passed to cb");
      done();
    });
  });

  it("should return an rbg if passed an rgb value");
});
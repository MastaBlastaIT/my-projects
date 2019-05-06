let hex2rgb = require('../lib/hex2rgb');
let assert = require('assert');
let should = require('chai').should();


describe("hex2rgb - should", function () {
  it("should return an error if the value is not a hex code", function (done) {
    hex2rgb("blue", (err) => {
      err.should.exist;
      done();
    });

    // assert.throws(() => hex2rgb("blue"));
    // assert.throws(() => hex2rgb("red"));
    // assert.throws(() => hex2rgb("1234"));
    // assert.throws(() => hex2rgb(1234));
  });

  it("should return correct rgb value", function (done) {
    hex2rgb("#fff", (err, rgb) => {
      should.not.exist(err);
      rgb.should.deep.equal([255, 255, 255]);
      done();
    });
  });

  it("should return an rbg if passed an rgb value");
});
let getPalette = require("../lib/getPalette");
let assert = require('chai').assert;

describe("getPalette - Chai assert", function () {
  it("should throw an error if result is not array", function () {
    function fetch() {
      return "not an array";
    }

    function fetchFromConfig(cb) {
      return getConfig().palette;
    }

    assert.throws(() => {
      getPalette(fetch)
    }, /is not an array/);
  });

  it("should return an array of 3 items by default", function () {
    let palette = getPalette();
    assert.isArray(palette, "did not return an array");
    assert.lengthOf(palette, 3, `did not return 3 items`);
  });
});

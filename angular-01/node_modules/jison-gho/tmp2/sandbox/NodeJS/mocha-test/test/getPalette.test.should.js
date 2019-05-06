let getPalette = require("../lib/getPalette");
let assert = require('chai').assert;
let should = require('chai').should();

describe("getPalette - should", function () {
  it("should throw an error if result is not array", function () {
    function fetch() {
      return "not an array";
    }

    should.throw(() => getPalette(fetch), /is not an array/)
  });

  it("should return an array of 3 items by default", function () {
    let palette = getPalette();
    palette.should.be.an('array').with.length(3);
  });
});

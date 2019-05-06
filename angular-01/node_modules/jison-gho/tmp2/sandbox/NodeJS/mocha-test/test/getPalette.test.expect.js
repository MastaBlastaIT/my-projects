let getPalette = require("../lib/getPalette");
let assert = require('chai').assert;
let expect = require('chai').expect;

describe("getPalette - expect", function () {
  it("should throw an error if result is not array", function () {
    function fetch() {
      return "not an array";
    }

    expect(() => getPalette(fetch)).to.throw(/is not an array/);
  });

  it("should return an array of 3 items by default", function () {
    let palette = getPalette();
    expect(palette).to.be.an('array').with.length(3);
  });
});

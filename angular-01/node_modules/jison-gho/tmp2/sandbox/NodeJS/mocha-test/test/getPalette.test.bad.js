/**
 * What's demonstrated in this file is a bad practice - use fixtures instead.
 */
const fs = require('fs');

let getPalette = require("../lib/getPalette");
let assert = require('assert');

let configFile = process.cwd() + "/config.json";

function writeConfig(config, cb) {
  fs.writeFile(configFile, JSON.stringify(config), cb);
}

describe("getPalette - Config file rewrite (bad)", function () {
  let config = {};  // save initial config

  before(function (done) {
    fs.readFile(configFile, (err, contents) => {
      config = JSON.parse(contents);
      done();
    });
  });

  afterEach(function (done) {
    writeConfig(config, done);  // reset to initial config after each test
  });


  it("should throw an error if result is not array", function (done) {
    writeConfig({palette: "not an array"}, (err) => {
      assert.throws(getPalette, /is not an array/);
      done();
    });
  });


  it("should return an array of 3 items by default", function () {
    let palette = getPalette();
    assert(Array.isArray(palette), "did not return an array");
    assert.equal(palette.length, 3, `did not return 3 items`);
  });
});

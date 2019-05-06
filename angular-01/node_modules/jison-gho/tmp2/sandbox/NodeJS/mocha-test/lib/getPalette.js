const fs = require('fs');

function getConfig() {
  return JSON.parse(fs.readFileSync(process.cwd() + "/config.json"));
}

function getData() {
  return ["#cc7790", "#ff5512", "#75d709"];
}

function getDataFromFile() {
  return getConfig().palette;
}

module.exports = function (fetch) {
  fetch = fetch || getDataFromFile;  // DI
  let palette = fetch();
  if (!Array.isArray(palette)) {
    throw new Error(`Returned palette ${palette} is not an array`);
  }

  return palette;
};

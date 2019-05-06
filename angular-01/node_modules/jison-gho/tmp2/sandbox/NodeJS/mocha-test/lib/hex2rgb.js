module.exports = function (hex, cb) {
  setTimeout(() => {
    if (/^#/.test(hex)) {
      hex = hex.slice(1);
    }

    if (hex.length !== 3 && hex.length !== 6) {
      cb(new Error("Invalid hexadecimal string"));
      return;
    }

    let nums = hex.split("");
    if (nums.length === 3) {
      nums = [nums[0], nums[0], nums[1], nums[1], nums[2], nums[2]];
    }

    let r = parseInt([nums[0], nums[1]].join(""), 16);
    let g = parseInt([nums[4], nums[5]].join(""), 16);
    let b = parseInt([nums[2], nums[3]].join(""), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      cb(new Error("Invalid hexadecimal string"));
      return;
    }

    cb(null, [r, g, b]);

  }, 50);

};

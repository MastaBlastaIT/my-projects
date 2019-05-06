module.exports = {
  "env": {
    "browser": false,
    "commonjs": false,
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "chrome": true,
    "$": true,
    "_": true
  },

  "rules": {
    "no-console": 0,
    "strict": 1,
    "no-unused-vars": 1
  }
};
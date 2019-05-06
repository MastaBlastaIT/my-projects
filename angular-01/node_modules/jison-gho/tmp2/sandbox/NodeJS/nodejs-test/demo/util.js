var util = require('util');

// util.inspect
var obj = {
    a: 5,
    b: 6,
    // inspect: function() {
    //     return 123;
    // }
};
obj.self = obj;
console.log(util.inspect(obj));  // util.inspect calls inspect function on an object

// util.format
var str = util.format("%s %d %j", "String", 123, {test: "obj"}); // also used by console(...)
console.log(str);

// util.inherits
function Animal(name) {
    this.name = name;
}
Animal.prototype.walk = function() {
    console.log(this.name + ': walking');
}

function Cat(name) {
    Animal.apply(this, arguments);
}
Cat.prototype.meow = function() {
    console.log(this.name + ": meoooow!");
}

util.inherits(Cat, Animal);

var cat = new Cat('cat');
cat.walk();
cat.meow();
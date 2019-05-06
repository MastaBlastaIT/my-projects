var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

var schema = mongoose.Schema({
    name: String
});
schema.methods.meow = function () {
    console.log(this.get('name'));
};

var Cat = mongoose.model('Cat', schema);  // goes to cats collection

var kitty = new Cat({name: 'Zildjian'});
console.log(kitty);

kitty.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(kitty);
        kitty.meow();
    }
});
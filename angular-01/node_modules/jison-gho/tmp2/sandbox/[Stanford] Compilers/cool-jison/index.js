/**
 * Created by Roman Spiridonov <romars@phystech.edu> on 10/27/2017.
 */
const fs = require('fs');

var parser = require('./cool').parser;

let file = fs.readFileSync('./hello_world.cl', {encoding: 'utf-8'});
var lexer = parser.lexer;
lexer.setInput(file);

let r, lex_output = "";
while(r = lexer.lex()) {
  if(r === 1) {
    lex_output += "<<EOF>>";
    break;
  }
  lex_output += r + ", ";
}

console.log("Lexer output:\n", lex_output, "\n");

console.log("Launching parser:\n");
let res = parser.parse(file);

console.log("\nas JSON:\n");
console.log(JSON.stringify(res));

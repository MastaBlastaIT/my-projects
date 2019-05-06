%lex
%%
. return 'CHARACTER';
/lex

%start characters

// %token CHARACTER  <-- is *implicit* due to the way I wrote the character rule below
 
%%

characters
  : character
  | characters character
  ;

character: CHARACTER 
        { console.log(@CHARACTER); }
    ;


%%

// compile with `jison --main test.jison`
// then execute this `main()` with `node test.js`

parser.main = function () {
	parser.parse('abc');
};

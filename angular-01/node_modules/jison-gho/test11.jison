%lex
%%
a return 'A';
b return 'B';
c return 'C';
. return 'CHARACTER';
/lex


%ebnf


// %token CHARACTER  <-- is *implicit* due to the way I wrote the character rule below
 
%%

pgm 
	: expr (expr expr)+ expr expr expr expr expr expr expr expr expr expr expr11
		{
			return $expr11 + '[' + $pgm_repetition_plus1.join(',') + ']' + $expr1;
		}
	;

expr1
	: A
	| B
	;

expr11
	: A
	| B
	| C
	;


%%

// compile with `jison --main test.jison`
// then execute this `main()` with `node test.js`

parser.main = function () {
	parser.parse('abc');
};


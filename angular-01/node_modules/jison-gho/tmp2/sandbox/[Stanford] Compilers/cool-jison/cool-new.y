%{
    //var Jison = require('jison');

    function prependChild(node, child) {
      node.splice(2,0,child);
      return node;
    }

    function appendChild(node, child) {
      node.splice(node.length, 0, child);
      return node;
    }

    function no_expr() {
      return ["EXPRESSION", {}];
    }
%}

/* operator associations and precedence */
%nonassoc IN
%right ASSIGN
%left NOT
%nonassoc LE '<' '='
%left '+' '-'
%left '*' '/'
%left ISVOID
%left '~'
%left '@'
%left '.'

%%
/* start of grammar */

program	: class_list	{
    $$ = ["PROGRAM", {}, $1];
    //typeof console !== 'undefined' ? console.log($1) : print($1);
    return $$;
};

class_list
: class	';'		/* single class */
  { $$ = ["CLASS_LIST", {}, $1]; }
| class_list class ';'	/* several classes */
  { $$ = appendChild($1, $2); parse_results = $$; }
| error ';' 
  { 
    console.log("recovered CLASS error:", $error.errStr, { expected: $error.expected });
    yyerrok();
    //yyclearin();
    $$ = ["CLASS_LIST", {}];
  }
;

class	: CLASS TYPEID '{' feature_list '}' // '
    { $$ = ["CLASS", {}, $2, "Object", $4]; }
  | CLASS TYPEID INHERITS TYPEID '{' feature_list '}' 
    { $$ = ["CLASS", {}, $2, $4, $6]; }
  | CLASS TYPEID error '{' feature_list '}' 
    { 
      console.log("recovered CLASS error: INHERIT?", $error.errStr, { expected: $error.expected });
      yyerrok();
      //yyclearin();
      $$ = ["CLASS", {}, $2, "Object", $5];
    }
  | CLASS error '{' feature_list '}' 
    { 
      console.log("recovered CLASS error: TYPEID?", $error.errStr, { expected: $error.expected });
      yyerrok();
      //yyclearin();
      $$ = ["CLASS", {}, "UNKNOWN", "Object", $4];
    }
;

feature_list:
  /* empty */
    {  $$ = ["FEATURES", {}]; }
  | feature_list feature ';'
    { $$ = appendChild($1, $2); }
  | error
    { 
      console.log("recovered FEATURE LIST error:", $error.errStr, { expected: $error.expected });
      yyerrok();
      yyclearin();
      $$ = ["FEATURES", {}];
    }
;

feature: OBJECTID '(' formals ')' ':' TYPEID '{' expression '}'   /* method def */
  { $$ = ["METHOD", {}, $1, $3, $6, $8]; }
| OBJECTID ':' TYPEID ASSIGN expression  /* attribute def */
  { $$ = ["ATTR", {}, $1, $3, $5]; }
| OBJECTID ':' TYPEID 
  { $$ = ["ATTR", {}, $1, $3, no_expr()]; }
| error
  { 
    console.log("recovered FEATURE error:", $error.errStr, { expected: $error.expected });
    yyerrok();
    //yyclearin();
    $$ = ["ERROR", {}];
  }
;

/* Comma-separated list */
formals: /* empty */ 
  { $$ = ["FORMALS", {}]; }
| formals_nonempty
  { $$ = $1; }     
;

formals_nonempty: formal
  { $$ = ["FORMALS", {}, $1]; }
| formals ',' formal
  { $$ = appendChild($1, $3); }
;

formal: OBJECTID ':' TYPEID
  { $$ = ["FORMAL", {}, $1, $3]; }
;

/* Comma-separated expr list */
expressions: /* empty */ 
  { $$ = ["EXPRESSIONS", {}]; }
| expressions_nonempty
  { $$ = $1; }     
;

expressions_nonempty: expression
  { $$ = ["EXPRESSIONS", {}, $1]; }
| expressions ',' expression
  { $$ = appendChild($1, $3); }
;

expressions_semicolon: expression ';'
  { $$ = ["EXPRESSIONS", {}, $1]; }
| expressions_semicolon expression ';' 
  { $$ = appendChild($1, $2); }
| expressions_semicolon error ';'
  { 
    console.log("recovered EXPRESSION error:", $error.errStr, { expected: $error.expected });
    yyerrok();
    //yyclearin();
    $$ = ["EXPRESSIONS", {}]; 
  }
;

cases: case
  { $$ = ["CASES", {}, $1]; }
| cases case
  { $$ = appendChild($1, $2); }
;

case: OBJECTID ':' TYPEID DARROW expression ';'
  { $$ = ["BRANCH", {}, $1, $3, $5]; }
;


expression: OBJECTID ASSIGN expression 
  { $$ = ["ASSIGN", {}, $1, $3]; }
| expression '@' TYPEID '.' OBJECTID '(' expressions ')'
  { 
    $$ = ["STATIC_DISPATCH", {}, $1, $3, $5, $7];
  }
| expression '.' OBJECTID '(' expressions ')'
  { $$ = ["DISPATCH", {}, $1, $3, $5]; }
| OBJECTID '(' expressions ')'
  { $$ = ["DISPATCH", {}, "self", $1, $3]; }
| IF expression THEN expression ELSE expression FI 
  { $$ = ["COND", {}, $2, $4, $6]; }
| WHILE expression LOOP expression POOL
  { $$ = ["LOOP", {}, $2, $4]; }
| '{' expressions_semicolon '}'
  { $$ = ["BLOCK", {}, $2]; }
| '{' error '}'
  { 
    console.log("recovered CURLY-BRACED EXPRESSION error:", $error.errStr, { expected: $error.expected });
    yyerrok();
    //yyclearin();
    $$ = ["ERROR", {}];
  }
| '{' error
  { 
    console.log("recovered CURLY-BRACED EXPRESSION error: MISSING CLOSING BRACE", $error.errStr, { expected: $error.expected });
    yyerrok();
    //yyclearin();
    $$ = ["ERROR", {}];
  }
| error '}'
  { 
    console.log("recovered CURLY-BRACED EXPRESSION error: MISSING OPENING BRACE OR 1 CLOSING BRACE TOO MANY?", $error.errStr, { expected: $error.expected });
    yyerrok();
    //yyclearin();
    $$ = ["ERROR", {}];
  }
| LET nested_let
  { $$ = ["NESTED_LET", {}, $2]; }
| CASE expression OF cases ESAC
  { $$ = ["TYPCASE", {}, $2, $4]; }
| NEW TYPEID 
  { $$ = ["NEW", {}, $2]; }
| ISVOID expression 
  { $$ = ["ISVOID", {}, $2]; }
| expression '+' expression
  { $$ = ["PLUS", {}, $1, $3]; }
| expression '-' expression
  { $$ = ["SUB", {}, $1, $3]; }
| expression '*' expression
  { $$ = ["MUL", {}, $1, $3]; }
| expression '/' expression
  { $$ = ["DIVIDE", {}, $1, $3]; }
| '~' expression
  { $$ = ["NEG", {}, $2]; }
| expression '<' expression
  { $$ = ["LT", {}, $1, $3]; }
| expression LE expression
  { $$ = ["LEQ", {}, $1, $3]; }
| expression '=' expression
  { $$ = ["EQ", {}, $1, $3]; }
| NOT expression
  { $$ = ["NOT", {}, $2]; }
| '(' expression ')'
  { $$ = ["PAREN", {}, $1]; }
| INT_CONST
  { $$ = ["INT_CONST", {val: parseInt(yytext)} ]; }
| BOOL_CONST
  { $$ = ["BOOL_CONST", {val: JSON.parse(yytext)} ]; }
| STR_CONST
  { $$ = ["STR_CONST", {val: yytext} ]; }
| OBJECTID 
  { $$ = ["OBJECTID", {val: yytext} ]; }
;

nested_let: OBJECTID ':' TYPEID ASSIGN expression IN expression
  { $$ = ["LET", {}, $1, $3, $5, $7]; }
| OBJECTID ':' TYPEID IN expression
  { $$ = ["LET", {}, $1, $3, no_expr(), $5]; }
| OBJECTID ':' TYPEID ASSIGN expression ',' nested_let
  { $$ = ["LET", {}, $1, $3, $5, $7]; }
| OBJECTID ':' TYPEID ',' nested_let
  { $$ = ["LET", {}, $1, $3, no_expr(), $5]; }
| error
  { 
    console.log("recovered EXPRESSION error:", $error.errStr, { expected: $error.expected });
    yyerrok();
    //yyclearin();
    $$ = ["LET", {}];
  }
;

/* end of grammar */
%%

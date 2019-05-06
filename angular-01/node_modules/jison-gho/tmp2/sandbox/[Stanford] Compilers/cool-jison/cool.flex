%options flex

%x COMMENT
%x LINE_COMMENT
%x STRING
%x CLASSDEF
%x INHERITSDEF

DIGIT         [0-9]
TYPE          [A-Z][_a-zA-Z0-9]*
ID            [a-z][_a-zA-Z0-9]*

%{
    var nested_comment_count = 0,
        string_error = false,
        MAX_STR_CONST = 256,
        string_buf = "";

    yy.lval = undefined;
    yy.error_msg = undefined;
    yy.curr_lineno = 1;
    yy.lex_error = () => {
      console.error(`Lexer error at line ${yy.curr_lineno}:\n${this.showPosition()}\n`, yy.error_msg);
    };
%}

%%
"=>"    return "DARROW";
"<="    return "LE";
"<-"    return "ASSIGN";


({DIGIT}*\.?{DIGIT}+|{DIGIT}+\.)        return "INT_CONST";
t[rR][uU][eE]                           return "BOOL_CONST";
f[aA][lL][sS][eE]                       return "BOOL_CONST";
\n                                      yy.curr_lineno++;

"--"                                    this.pushState('LINE_COMMENT');
<LINE_COMMENT>.* ;
<LINE_COMMENT>[\n] %{
  yy.curr_lineno++;
  this.popState();
%}
<LINE_COMMENT><<EOF>>  this.popState();  // eof in this case is ok

"*)"  %{
  yy.error_msg = "Unmatched *)";
  yy.lex_error();
%}
<INITIAL>"(*"  this.pushState("COMMENT");
<COMMENT>"(*"  nested_comment_count++;
<COMMENT>"*)"  %{
  if(nested_comment_count == 0)
    this.popState();
  else
    nested_comment_count--;
%}
<COMMENT>([^(*\n]+)|. ;
<COMMENT>[\n]   yy.curr_lineno++;
<COMMENT><<EOF>> %{
  yy.error_msg = "EOF in comment";
  this.popState();
  yy.lex_error();
%}

[ \t\f\r\v]+   ; // skip whitespace

"else"   return "ELSE";
"if"     return "IF";
"fi"     return "FI";
"in"     return "IN";
"let"    return "LET";
"loop"   return "LOOP";
"pool"   return "POOL";
"then"   return "THEN";
"while"  return "WHILE";
"case"   return "CASE";
"esac"   return "ESAC";
"of"     return "OF";
"new"    return "NEW";
"isvoid"   return "ISVOID";
"not"    return "NOT";
"class"       return "CLASS";
"inherits"    return "INHERITS";

{TYPE}  return "TYPEID";
{ID}    return "OBJECTID";

\"  %{  // "
  // String constants (C syntax) Escape sequence \c is accepted for all characters c. Except for \n \t \b \f, the result is c.
  string_error = false;
  string_buf = "";
  this.pushState('STRING');
%}

<STRING>\" %{  // "
  this.popState();
  if(!string_error) {
    if(string_buf.length >= MAX_STR_CONST) {
      yy.error_msg = "String constant too long";
      string_error = true;
      yy.lex_error();
      // error recovery
      string_buf.length = MAX_STR_CONST;
    }
    return "STR_CONST";
  }
%}

<STRING>\\\n|\\\r\\\n  %{  // support both win and unix style of line endings
  string_buf += '\n';
  yy.curr_lineno++;
%}
<STRING>"\\t"  string_buf += '\t';
<STRING>"\\n"  string_buf += '\n';
<STRING>"\\b"  string_buf += '\b';
<STRING>"\\f"  string_buf += '\f';
<STRING>\n  %{
  this.popState();
  if(!string_error) {
    this.error_msg = "Unterminated string constant";
    return "ERROR";
  }
%}
<STRING>\0|\\\0  %{
  if(!string_error) {
    yy.error_msg = "String contains null character";
    string_error = true;
    yy.lex_error();
  }
%}
<STRING>\\[^\0]  string_buf += yytext;
<STRING>[^\0\\\n\"]+        %{  //"
        string_buf += yytext;
%}
<STRING>\\[0-7]{1,3} %{
        // octal escape sequence
        var result = parseInt(yytext, 8);
        if ( result > 0xff ) {
          if(!string_error) {
            yy.error_msg = "Escape code is out of bounds";
            string_error = true;
            yy.lex_error();
          }
        }
        string_buf += String.fromCharCode(result);
%}
<STRING>\\[0-9]+ %{
        // like '\48' or '\0777777'
        if(!string_error) {
          yy.error_msg = "Invalid escaped character";
          string_error = true;
          yy.lex_error();
        }
%}
<STRING><<EOF>> %{
  this.popState();
  if(!string_error) {
    yy.error_msg = "EOF in string";
    yy.lex_error();
  }
%}

"+"|"/"|"-"|"*"|"="|"<"|"."|"~"|","|";"|":"|"("|")"|"@"|"{"|"}" %{
  return yytext;
%}

\0 %{
  yy.error_msg = "Null character in code: ";
  yy.lex_error();
%}

. %{
  yy.error_msg = "Skipping token: " + yytext;
  yy.lex_error();
  // simply skip error tokens
%}

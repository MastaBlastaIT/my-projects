/*
 *  The scanner definition for COOL.
 */

/*
 *  Stuff enclosed in %{ %} in the first section is copied verbatim to the
 *  output, so headers and global definitions are placed here to be visible
 * to the code in the file.  Don't remove anything that was here initially
 */
%{
#include <cool-parse.h>
#include <stringtab.h>
#include <utilities.h>

/* The compiler assumes these identifiers. */
#define yylval cool_yylval
#define yylex  cool_yylex

/* Max size of string constants */
#define MAX_STR_CONST 1025
#define YY_NO_UNPUT   /* keep g++ happy */

extern FILE *fin; /* we read from this file */

/* define YY_INPUT so we read from the FILE fin:
 * This change makes it possible to use this scanner in
 * the Cool compiler.
 */
#undef YY_INPUT
#define YY_INPUT(buf,result,max_size) \
	if ( (result = fread( (char*)buf, sizeof(char), max_size, fin)) < 0) \
		YY_FATAL_ERROR( "read() in flex scanner failed");

/* #define YY_USER_ACTION \
   cerr << yytext << " -- rule #" << yy_act << endl; */

char string_buf[MAX_STR_CONST]; /* to assemble string constants */
char *string_buf_ptr;

extern int curr_lineno;
extern int verbose_flag;

extern YYSTYPE cool_yylval;

/*
 *  Add Your own definitions here
 */
#include <math.h>  // for atoi, atof

int idenid = 0,  // for entry ids
  strid = 0,
  intid = 0;

int nested_comment_count = 0;
int string_error = 0;


%}

/*
 * Define names for regular expressions here.
 */
%x COMMENT
%x LINE_COMMENT
%x STRING
%x CLASSDEF
%x INHERITSDEF

DIGIT         [0-9]
TYPE          [A-Z][_a-zA-Z0-9]*
ID            [a-z][_a-zA-Z0-9]*

%%

 /*
  *  Nested comments
  */


 /*
  *  The multiple-character operators.
  */

"=>"    { return (DARROW); }
"<="    { return (LE); }
"<-"    { return (ASSIGN); }


({DIGIT}*\.?{DIGIT}+|{DIGIT}+\.)        {   
  Entry* e = new IntEntry(yytext, yyleng, intid++);
  cool_yylval.symbol = e;
  return INT_CONST;
}
t[rR][uU][eE]  {   
  cool_yylval.boolean = 1;
  return BOOL_CONST;
}
f[aA][lL][sS][eE] {   
  cool_yylval.boolean = 0;
  return BOOL_CONST;
}

\n  { curr_lineno++; }

"--" { BEGIN(LINE_COMMENT); }
<LINE_COMMENT>.*
<LINE_COMMENT>\n {
  curr_lineno++;
  BEGIN(INITIAL); 
}
<LINE_COMMENT><<EOF>>  {
  BEGIN(INITIAL);  // eof in this case is ok
}

"*)"  {
  cool_yylval.error_msg = "Unmatched *)";
  return (ERROR); 
}                                          
<INITIAL>"(*"  { BEGIN(COMMENT); }
<COMMENT>"(*"  { nested_comment_count++; }
<COMMENT>"*)"  { 
  if(nested_comment_count == 0) 
    BEGIN(INITIAL); 
  else 
    nested_comment_count--;
}
<COMMENT>([^(*\n]+)|.
<COMMENT>\n                                  { curr_lineno++; }
<COMMENT><<EOF>>                             { 
  cool_yylval.error_msg = "EOF in comment";
  BEGIN(INITIAL);
  return (ERROR); 
}

[ \t\f\r\v]+   ; // skip whitespace

 /*
  * Keywords are case-insensitive except for the values true and false,
  * which must begin with a lower-case letter.
  */
(?i:"else")  { return (ELSE); }
(?i:"if")    { return (IF); }
(?i:"fi")    { return (FI); }
(?i:"in")    { return (IN); }
(?i:"let")   { return (LET); }
(?i:"loop")  { return (LOOP); }
(?i:"pool")  { return (POOL); }
(?i:"then")  { return (THEN); }
(?i:"while") { return (WHILE); }
(?i:"case")  { return (CASE); }
(?i:"esac")  { return (ESAC); }
(?i:"of")    { return (OF); }
(?i:"new")   { return (NEW); }
(?i:"isvoid")  { return (ISVOID); }
(?i:"not")   { return (NOT); }
(?i:"class")      { return (CLASS); }
(?i:"inherits")   { return (INHERITS); }

  /*
  (?i:"class") {
    BEGIN(CLASSDEF);
    return (CLASS);
  }
  <CLASSDEF>(?i:"inherits") {
    BEGIN(INHERITSDEF);
    return (INHERITS);
  }
  <CLASSDEF,INHERITSDEF>{TYPE} {
    Entry* e = new IdEntry(yytext, yyleng, idenid++);
    cool_yylval.symbol = e;
    return TYPEID;
  }
  <CLASSDEF,INHERITSDEF>"{"  {
    BEGIN(INITIAL);
  }
  */
{TYPE} {
  Entry* e = new IdEntry(yytext, yyleng, idenid++);
  cool_yylval.symbol = e;
  return TYPEID;
}
{ID} {
  Entry* e = new IdEntry(yytext, yyleng, idenid++);
  cool_yylval.symbol = e;
  return OBJECTID;
}

 /*
  *  String constants (C syntax)
  *  Escape sequence \c is accepted for all characters c. Except for 
  *  \n \t \b \f, the result is c.
  *
  */
\"  {  // "
  string_buf_ptr = string_buf; 
  string_error = 0;
  BEGIN(STRING); 
}

<STRING>\" {  // "
  BEGIN(INITIAL);
  if(!string_error) {
    if(string_buf_ptr - string_buf >= MAX_STR_CONST) {
      cool_yylval.error_msg = "String constant too long";
      string_error = 1;
      return ERROR;
    }
    *string_buf_ptr = '\0';
    Entry* e = new StringEntry(string_buf, strlen(string_buf), strid++);
    cool_yylval.symbol = e;
    return STR_CONST;    
  }
}

<STRING>\\\n|\\\r\n  {  // support both win and unix style of line endings
  *string_buf_ptr++ = '\n';
  curr_lineno++;
}
<STRING>\\t  *string_buf_ptr++ = '\t';
<STRING>\\n  *string_buf_ptr++ = '\n';
<STRING>\\b  *string_buf_ptr++ = '\b';
<STRING>\\f  *string_buf_ptr++ = '\f';
<STRING>\n  {
  BEGIN(INITIAL);
  if(!string_error) {
    cool_yylval.error_msg = "Unterminated string constant";
    return ERROR;    
  }
}
<STRING>\0|\\\0  {
  yytext++;
  if(!string_error) {
    cool_yylval.error_msg = "String contains null character";
    string_error = 1;
    return ERROR;  
  }
}
<STRING>\\[^\0]  *string_buf_ptr++ = yytext[1];

<STRING>[^\0\\\n\"]+        {  //"
        char *yptr = yytext;
        while ( *yptr )
                *string_buf_ptr++ = *yptr++;
}
<STRING>\\[0-7]{1,3} {
        /* octal escape sequence */
        int result;
        sscanf(yytext + 1, "%o", &result);
        if ( result > 0xff ) {
          if(!string_error) {
            cool_yylval.error_msg = "Escape code is out of bounds";
            string_error = 1;
            return ERROR;
          }          
        }
        *string_buf_ptr++ = result;
}
<STRING>\\[0-9]+ {
        /* like '\48' or '\0777777' */
        if(!string_error) {
          cool_yylval.error_msg = "Invalid escaped character";
          string_error = 1;
          return ERROR;         
        }
}
<STRING><<EOF>> {
  BEGIN(INITIAL);
  if(!string_error) {
    cool_yylval.error_msg = "EOF in string";
    return (ERROR);   
  }
}

"+"|"/"|"-"|"*"|"="|"<"|"."|"~"|","|";"|":"|"("|")"|"@"|"{"|"}" {
  return yytext[0];
}

. {
  cool_yylval.error_msg = yytext;
  return ERROR;
}

%%

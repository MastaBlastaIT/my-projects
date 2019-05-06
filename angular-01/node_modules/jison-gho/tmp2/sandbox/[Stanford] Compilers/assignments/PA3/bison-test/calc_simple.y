%{
 #define YYSTYPE double
 #include <math.h>
 #include <stdio.h>
 int yylex (void);
 void yyerror (char const *);
%}

%token NUM STR
%left '+' '-'
%left '*'

%%

exp:
  exp '+' exp
| exp '-' exp
| exp '*' exp
| exp '/' exp
| NUM
;
useless: STR;

%%

#include <ctype.h>
int yylex (void)
{
  int c;

  /* Skip white space.  */
  while ((c = getchar ()) == ' ' || c == '\t')
    continue;
  /* Process numbers.  */
  if (c == '.' || isdigit (c))
    {
      ungetc (c, stdin);
      scanf ("%lf", &yylval);
      return NUM;
    }
  /* Return end-of-input.  */
  if (c == EOF)
    return 0;
  /* Return a single char.  */
  return c;
}

/* Called by yyparse on error.  */
void yyerror (char const *s)
{
  fprintf (stderr, "%s\n", s);
}

int main (void)
{
  return yyparse ();
}

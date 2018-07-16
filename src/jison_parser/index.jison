
/* lexical grammar */
%lex
/*
%s timestamp
*/
%%

/*
"@"                               { this.begin("timestamp"); return 'AT' }
<timestamp>[0-9]+("."[0-9]+)?     return 'FLOAT'
<timestamp>"s"                    { this.popState(); return 'SECONDS' }
*/

[^\S\r\n]+             return "WHITESPACE"
[0-9]+                 return "NUMBER"
"-"                    return "DASH"

\<[A-Za-z]+(_[A-Za-z]+)*\> return "LONG_FAMILY_NAME"

(Rw|Fw|Uw|Bw|Lw|Dw)    return "FAMILY_W"
(R|F|U|B|L|D)          return "FAMILY_UPPERCASE"
(r|f|u|b|l|d)          return "FAMILY_LOWERCASE"
(x|y|z)                return "FAMILY_ROTATION"
(M|E|S|m|e|s)          return "FAMILY_SLICE"

"'"                    return "PRIME"
"."                    return "PAUSE"


"//"[^\n\r]*           return "COMMENT_SHORT"
"/*"[^]*?"*/"          return "COMMENT_LONG"
[\n\r]                 return "NEWLINE"

"["                    return "OPEN_BRACKET"
"]"                    return "CLOSE_BRACKET"
"("                    return "OPEN_PARENTHESIS"
")"                    return "CLOSE_PARENTHESIS"
","                    return "COMMA"
":"                    return "COLON"

<<EOF>>                return "EOF"
.                      return "INVALID"

/lex

%% /* language grammar */

expressions
    : TOP_LEVEL_ALG EOF
        { return $TOP_LEVEL_ALG; }
    ;

LAYER
    : NUMBER
        {$$ = parseInt($NUMBER);}
    ;

REPETITION
    : NUMBER
        {$$ = parseInt($NUMBER);}
    ;

AMOUNT
    : REPETITION
    | REPETITION PRIME
        {$$ = -$REPETITION;}
    | PRIME
        {$$ = -1;}
    ;

COMMENT
    : COMMENT_SHORT
        {$$ = {type: "commentShort", comment: $COMMENT_SHORT.slice(2)};}
    | COMMENT_LONG
        {$$ = {type: "commentLong", comment: $COMMENT_LONG.slice(2, -2)};}
    ;

FAMILY_WIDE
    : FAMILY_W
    | FAMILY_LOWERCASE
    ;

FAMILY_SINGLE_SLICE
    : FAMILY_UPPERCASE
    ;

FAMILY_PLAIN
    : FAMILY_ROTATION
    | FAMILY_SLICE
    ;

SIGN_MOVE
    : FAMILY_WIDE
        {$$ = {type: "signMove", family: $1};}
    | FAMILY_SINGLE_SLICE
        {$$ = {type: "signMove", family: $1};}
    | FAMILY_PLAIN
        {$$ = {type: "signMove", family: $1};}
    | LONG_FAMILY_NAME
        {$$ = {type: "signMove", family: $1};}
    | LAYER FAMILY_WIDE
        {$$ = {type: "signMove", family: $2, innerLayer: $1};}
    | LAYER FAMILY_SINGLE_SLICE
        {$$ = {type: "signMove", family: $2, innerLayer: $1};}
    | LAYER LONG_FAMILY_NAME
        {$$ = {type: "signMove", family: $2, innerLayer: $1};}
    | LAYER DASH LAYER FAMILY_WIDE
        {$$ = {type: "signMove", family: $4, outerLayer: $1, innerLayer: $3};}
    | LAYER DASH LAYER FAMILY_WIDE
        {$$ = {type: "signMove", family: $4, outerLayer: $1, innerLayer: $3};}
    | LAYER DASH LAYER LONG_FAMILY_NAME
        {$$ = {type: "signMove", family: $4, outerLayer: $1, innerLayer: $3};}
    ;

/*
TIMESTAMP
    : AT FLOAT SECONDS
        {$$ = {type: "timestamp", time: parseFloat($2)};}
    ;
*/

OPTIONAL_WHITESPACE
    : WHITESPACE OPTIONAL_WHITESPACE
    | /* nothing */
    ;

REPEATABLE_UNIT
    : SIGN_MOVE
    | OPEN_BRACKET SEQUENCE COMMA SEQUENCE CLOSE_BRACKET
        {$$ = {"type": "commutator", "A": $2, "B": $4};}
    | OPEN_BRACKET SEQUENCE COLON SEQUENCE CLOSE_BRACKET
        {$$ = {"type": "conjugate", "A": $2, "B": $4};}
    | OPEN_PARENTHESIS SEQUENCE CLOSE_PARENTHESIS
        {$$ = {"type": "group", "nestedSequence": $SEQUENCE};}
    ;

REPEATED_UNIT
    : REPEATABLE_UNIT
        {$REPEATABLE_UNIT.amount = 1; $$ = $REPEATABLE_UNIT;}
    | REPEATABLE_UNIT AMOUNT
        {$REPEATABLE_UNIT.amount = $AMOUNT; $$ = $REPEATABLE_UNIT;}
    | PAUSE
        {$$ = {type: "pause"};}
    | NEWLINE
        {$$ = {type: "newLine"};}
    | COMMENT
    ;

UNIT_LIST
    : REPEATED_UNIT
        {$$ = [$REPEATED_UNIT];}
    | UNIT_LIST OPTIONAL_WHITESPACE REPEATED_UNIT
        {$$ = $UNIT_LIST.concat([$REPEATED_UNIT]);}
    ;

SEQUENCE
    : OPTIONAL_WHITESPACE UNIT_LIST OPTIONAL_WHITESPACE
        {$$ = {"type": "sequence", "nestedUnits": $UNIT_LIST};}
    | OPTIONAL_WHITESPACE
        {$$ = {"type": "sequence", "nestedUnits": []};}
    ;
TOP_LEVEL_ALG
    : SEQUENCE
        {$$ = $1;}
/*
    | OPTIONAL_WHITESPACE TIMESTAMP OPTIONAL_WHITESPACE
        {$$ = [$TIMESTAMP];}
*/
    ;
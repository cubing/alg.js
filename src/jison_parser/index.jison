
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
/*
"-"                    return "DASH"
*/

[A-Za-z]+              return "FAMILY_LONG"
/*
(R|F|U|B|L|D)          return "FAMILY_UPPERCASE"
(r|f|u|b|l|d)          return "FAMILY_LOWERCASE"
(Rw|Fw|Uw|Bw|Lw|Dw)    return "FAMILY_W"
(x|y|z)                return "FAMILY_ROTATION"
(M|E|S|m|e|s)          return "FAMILY_SLICE"
*/

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

/*
LAYER
    : NUMBER
        {$$ = parseInt($NUMBER);}
    ;
*/

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

/*
FAMILY_WIDE
    : FAMILY_W
    | FAMILY_LOWERCASE
    ;
*/

BLOCK_MOVE_FAMILY
    : FAMILY_LONG
    | NUMBER FAMILY_LONG
	{$$ = "" + $1 + $2;}
/*
    | FAMILY_WIDE
    | FAMILY_ROTATION
    | FAMILY_SLICE
*/
    ;

BLOCK_MOVE
    : BLOCK_MOVE_FAMILY
        {$$ = {type: "blockMove", family: $BLOCK_MOVE_FAMILY};}
/*
    | LAYER FAMILY_UPPERCASE
        {$$ = {type: "move", family: $FAMILY_UPPERCASE, layer: $LAYER};}
    | LAYER FAMILY_WIDE
        {$$ = {type: "move", family: $FAMILY_WIDE, endLayer: $LAYER};}
    | LAYER DASH LAYER FAMILY_WIDE
        {$$ = {type: "move", family: $FAMILY_WIDE, startLayer: $1, endLayer: $3};}
*/
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
    : BLOCK_MOVE
    | OPEN_BRACKET UNIT_OR_SEQUENCE COMMA UNIT_OR_SEQUENCE CLOSE_BRACKET
        {$$ = {"type": "commutator", "A": $2, "B": $4};}
    | OPEN_BRACKET UNIT_OR_SEQUENCE COLON UNIT_OR_SEQUENCE CLOSE_BRACKET
        {$$ = {"type": "conjugate", "A": $2, "B": $4};}
    | OPEN_PARENTHESIS UNIT_OR_SEQUENCE CLOSE_PARENTHESIS
        {$$ = {"type": "group", "nestedAlg": $UNIT_OR_SEQUENCE};}
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
    : REPEATED_UNIT OPTIONAL_WHITESPACE REPEATED_UNIT
        {$$ = [$1, $3];}
    | UNIT_LIST OPTIONAL_WHITESPACE REPEATED_UNIT
        {$$ = $1.concat([$3]);}
    ;

UNIT_OR_SEQUENCE
    : OPTIONAL_WHITESPACE REPEATED_UNIT OPTIONAL_WHITESPACE
        {$$ = $REPEATED_UNIT;}
    | OPTIONAL_WHITESPACE UNIT_LIST OPTIONAL_WHITESPACE
        {$$ = {"type": "sequence", "nestedAlgs": $UNIT_LIST};}
    ;

TOP_LEVEL_ALG
    : UNIT_OR_SEQUENCE
        {$$ = $1;}
/*
    | OPTIONAL_WHITESPACE TIMESTAMP OPTIONAL_WHITESPACE
        {$$ = [$TIMESTAMP];}
*/
    ;

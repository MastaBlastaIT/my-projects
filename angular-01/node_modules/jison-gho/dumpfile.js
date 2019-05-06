(function () {

// See also:
// http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/#35881508
// but we keep the prototype.constructor and prototype.name assignment lines too for compatibility
// with userland code which might access the derived class in a 'classic' way.
function JisonParserError(msg, hash) {
    Object.defineProperty(this, 'name', {
        enumerable: false,
        writable: false,
        value: 'JisonParserError'
    });

    if (msg == null) msg = '???';

    Object.defineProperty(this, 'message', {
        enumerable: false,
        writable: true,
        value: msg
    });

    this.hash = hash;

    var stacktrace;
    if (hash && hash.exception instanceof Error) {
        var ex2 = hash.exception;
        this.message = ex2.message || msg;
        stacktrace = ex2.stack;
    }
    if (!stacktrace) {
        if (Error.hasOwnProperty('captureStackTrace')) {
            // V8
            Error.captureStackTrace(this, this.constructor);
        } else {
            stacktrace = new Error(msg).stack;
        }
    }
    if (stacktrace) {
        Object.defineProperty(this, 'stack', {
            enumerable: false,
            writable: false,
            value: stacktrace
        });
    }
}

if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(JisonParserError.prototype, Error.prototype);
} else {
    JisonParserError.prototype = Object.create(Error.prototype);
}
JisonParserError.prototype.constructor = JisonParserError;
JisonParserError.prototype.name = 'JisonParserError';






        // helper: reconstruct the defaultActions[] table
        function bda(s) {
            var rv = {};
            var d = s.idx;
            var g = s.goto;
            for (var i = 0, l = d.length; i < l; i++) {
                var j = d[i];
                rv[j] = g[i];
            }
            return rv;
        }
    


        // helper: reconstruct the 'goto' table
        function bt(s) {
            var rv = [];
            var d = s.len;
            var y = s.symbol;
            var t = s.type;
            var a = s.state;
            var m = s.mode;
            var g = s.goto;
            for (var i = 0, l = d.length; i < l; i++) {
                var n = d[i];
                var q = {};
                for (var j = 0; j < n; j++) {
                    var z = y.shift();
                    switch (t.shift()) {
                    case 2:
                        q[z] = [
                            m.shift(),
                            g.shift()
                        ];
                        break;

                    case 0:
                        q[z] = a.shift();
                        break;

                    default:
                        // type === 1: accept
                        q[z] = [
                            3
                        ];
                    }
                }
                rv.push(q);
            }
            return rv;
        }
    


        // helper: runlength encoding with increment step: code, length: step (default step = 0)
        // `this` references an array
        function s(c, l, a) {
            a = a || 0;
            for (var i = 0; i < l; i++) {
                this.push(c);
                c += a;
            }
        }

        // helper: duplicate sequence from *relative* offset and length.
        // `this` references an array
        function c(i, l) {
            i = this.length - i;
            for (l += i; i < l; i++) {
                this.push(this[i]);
            }
        }

        // helper: unpack an array using helpers and data, all passed in an array argument 'a'.
        function u(a) {
            var rv = [];
            for (var i = 0, l = a.length; i < l; i++) {
                var e = a[i];
                // Is this entry a helper function?
                if (typeof e === 'function') {
                    i++;
                    e.apply(rv, a[i]);
                } else {
                    rv.push(e);
                }
            }
            return rv;
        }
    

var parser = {
    // Code Generator Information Report
    // ---------------------------------
    //
    // Options:
    //
    //   default action mode: ............. classic,merge
    //   no try..catch: ................... false
    //   no default resolve on conflict:    false
    //   on-demand look-ahead: ............ false
    //   error recovery token skip maximum: 3
    //   yyerror in parse actions is: ..... NOT recoverable,
    //   yyerror in lexer actions and other non-fatal lexer are:
    //   .................................. NOT recoverable,
    //   debug grammar/output: ............ false
    //   has partial LR conflict upgrade:   true
    //   rudimentary token-stack support:   false
    //   parser table compression mode: ... 2
    //   export debug tables: ............. false
    //   export *all* tables: ............. false
    //   module type: ..................... commonjs
    //   parser engine type: .............. lalr
    //   output main() in the module: ..... true
    //   number of expected conflicts: .... 0
    //
    //
    // Parser Analysis flags:
    //
    //   no significant actions (parser is a language matcher only): 
    //   .................................. false
    //   uses yyleng: ..................... false
    //   uses yylineno: ................... false
    //   uses yytext: ..................... false
    //   uses yylloc: ..................... false
    //   uses ParseError API: ............. false
    //   uses YYERROR: .................... false
    //   uses YYRECOVERING: ............... false
    //   uses YYERROK: .................... false
    //   uses YYCLEARIN: .................. false
    //   tracks rule values: .............. true
    //   assigns rule values: ............. true
    //   uses location tracking: .......... false
    //   assigns location: ................ false
    //   uses yystack: .................... false
    //   uses yysstack: ................... false
    //   uses yysp: ....................... true
    //   uses yyrulelength: ............... false
    //   uses yyMergeLocationInfo API: .... false
    //   has error recovery: .............. false
    //   has error reporting: ............. false
    //
    // --------- END OF REPORT -----------

trace: function no_op_trace() {},
JisonParserError: JisonParserError,
yy: {},
options: {
  type: "lalr",
  hasPartialLrUpgradeOnConflict: true,
  errorRecoveryTokenDiscardCount: 3
},
symbols_: {
  "$accept": 0,
  "$end": 1,
  "A": 8,
  "B": 9,
  "EOF": 1,
  "G": 7,
  "S": 6,
  "error": 2,
  "x": 4,
  "y": 5,
  "z": 3
},
terminals_: {
  1: "EOF",
  2: "error",
  3: "z",
  4: "x",
  5: "y"
},
TERROR: 2,
EOF: 1,

// internals: defined here so the object *structure* doesn't get modified by parse() et al,
// thus helping JIT compilers like Chrome V8.
originalQuoteName: null,
originalParseError: null,
cleanupAfterParse: null,
constructParseErrorInfo: null,
yyMergeLocationInfo: null,

__reentrant_call_depth: 0, // INTERNAL USE ONLY
__error_infos: [], // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup
__error_recovery_infos: [], // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup

// APIs which will be set up depending on user action code analysis:
//yyRecovering: 0,
//yyErrOk: 0,
//yyClearIn: 0,

// Helper APIs
// -----------

// Helper function which can be overridden by user code later on: put suitable quotes around
// literal IDs in a description string.
quoteName: function parser_quoteName(id_str) {
    return '"' + id_str + '"';
},

// Return the name of the given symbol (terminal or non-terminal) as a string, when available.
//
// Return NULL when the symbol is unknown to the parser.
getSymbolName: function parser_getSymbolName(symbol) {
    if (this.terminals_[symbol]) {
        return this.terminals_[symbol];
    }

    // Otherwise... this might refer to a RULE token i.e. a non-terminal: see if we can dig that one up.
    //
    // An example of this may be where a rule's action code contains a call like this:
    //
    //      parser.getSymbolName(#$)
    //
    // to obtain a human-readable name of the current grammar rule.
    var s = this.symbols_;
    for (var key in s) {
        if (s[key] === symbol) {
            return key;
        }
    }
    return null;
},

// Return a more-or-less human-readable description of the given symbol, when available,
// or the symbol itself, serving as its own 'description' for lack of something better to serve up.
//
// Return NULL when the symbol is unknown to the parser.
describeSymbol: function parser_describeSymbol(symbol) {
    if (symbol !== this.EOF && this.terminal_descriptions_ && this.terminal_descriptions_[symbol]) {
        return this.terminal_descriptions_[symbol];
    } else if (symbol === this.EOF) {
        return 'end of input';
    }
    var id = this.getSymbolName(symbol);
    if (id) {
        return this.quoteName(id);
    }
    return null;
},

// Produce a (more or less) human-readable list of expected tokens at the point of failure.
//
// The produced list may contain token or token set descriptions instead of the tokens
// themselves to help turning this output into something that easier to read by humans
// unless `do_not_describe` parameter is set, in which case a list of the raw, *numeric*,
// expected terminals and nonterminals is produced.
//
// The returned list (array) will not contain any duplicate entries.
collect_expected_token_set: function parser_collect_expected_token_set(state, do_not_describe) {
    var TERROR = this.TERROR;
    var tokenset = [];
    var check = {};
    // Has this (error?) state been outfitted with a custom expectations description text for human consumption?
    // If so, use that one instead of the less palatable token set.
    if (!do_not_describe && this.state_descriptions_ && this.state_descriptions_[state]) {
        return [this.state_descriptions_[state]];
    }
    for (var p in this.table[state]) {
        p = +p;
        if (p !== TERROR) {
            var d = do_not_describe ? p : this.describeSymbol(p);
            if (d && !check[d]) {
                tokenset.push(d);
                check[d] = true; // Mark this token description as already mentioned to prevent outputting duplicate entries.
            }
        }
    }
    return tokenset;
},
productions_: [
  [
    6,
    3
  ],
  [
    7,
    1
  ],
  [
    8,
    2
  ],
  [
    8,
    1
  ],
  [
    9,
    1
  ]
],
performAction: function parser__PerformAction(yystate /* action[1] */, yysp, yyvstack) {

          /* this == yyval */

          // the JS engine itself can go and remove these statements when `yy` turns out to be unused in any action code!
          var yy = this.yy;
          var yyparser = yy.parser;
          var yylexer = yy.lexer;

          

          switch (yystate) {
case 0:
    /*! Production::    $accept : S $end */

    // default action (generated by JISON mode classic/merge :: VT,VA,-,-,-,-,-,-):
    this.$ = yyvstack[yysp - 1];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,-,-,-,-,-,-)
    break;

case 1:
    /*! Production::    S : G A B */

    // default action (generated by JISON mode classic/merge :: VT,VA,-,-,-,-,-,-):
    this.$ = yyvstack[yysp - 2];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,-,-,-,-,-,-)
    
    
    return yyvstack[yysp - 2] + yyvstack[yysp - 1] + yyvstack[yysp]
    break;

case 2:
    /*! Production::    G : z */
case 4:
    /*! Production::    A : x */

    this.$ = yyvstack[yysp]
    break;

case 3:
    /*! Production::    A : A x */

    this.$ = yyvstack[yysp - 1]+'x'
    break;

case 5:
    /*! Production::    B : y */

    this.$ = yyvstack[yysp - 2]
    break;

}
},
table: bt({
  len: u([
  3,
  1,
  2,
  0,
  3,
  s,
  [0, 4]
]),
  symbol: u([
  3,
  6,
  7,
  1,
  4,
  8,
  4,
  5,
  9
]),
  type: u([
  2,
  0,
  0,
  1,
  2,
  0,
  2,
  2,
  0
]),
  state: u([
  1,
  2,
  4,
  6
]),
  mode: u([
  s,
  [1, 4]
]),
  goto: u([
  3,
  5,
  7,
  8
])
}),
defaultActions: bda({
  idx: u([
  3,
  s,
  [5, 4, 1]
]),
  goto: u([
  2,
  4,
  1,
  3,
  5
])
}),
parseError: function parseError(str, hash, ExceptionClass) {
    if (hash.recoverable && typeof this.trace === 'function') {
        this.trace(str);
        hash.destroy(); // destroy... well, *almost*!
    } else {
        if (!ExceptionClass) {
            ExceptionClass = this.JisonParserError;
        }
        throw new ExceptionClass(str, hash);
    }
},
parse: 
function parse(input) {
    var self = this;
    var stack = new Array(128);         // token stack: stores token which leads to state at the same index (column storage)
    var sstack = new Array(128);        // state stack: stores states (column storage)

    var vstack = new Array(128);        // semantic value stack

    var table = this.table;
    var sp = 0;                         // 'stack pointer': index into the stacks


    var yylineno;


    var symbol = 0;



    var TERROR = this.TERROR;
    var EOF = this.EOF;
    var ERROR_RECOVERY_TOKEN_DISCARD_COUNT = (this.options.errorRecoveryTokenDiscardCount | 0) || 3;
    var NO_ACTION = [0, 9 /* === table.length :: ensures that anyone using this new state will fail dramatically! */];

    var lexer;
    if (this.__lexer__) {
        lexer = this.__lexer__;
    } else {
        lexer = this.__lexer__ = Object.create(this.lexer);
    }

    var sharedState_yy = {
        parseError: undefined,
        quoteName: undefined,
        lexer: undefined,
        parser: undefined,
        pre_parse: undefined,
        post_parse: undefined,
        pre_lex: undefined,
        post_lex: undefined      // WARNING: must be written this way for the code expanders to work correctly in both ES5 and ES6 modes!
    };

    var ASSERT;
    if (typeof assert !== 'function') {
        ASSERT = function JisonAssert(cond, msg) {
            if (!cond) {
                throw new Error('assertion failed: ' + (msg || '***'));
            }
        };
    } else {
        ASSERT = assert;
    }
    
    this.yyGetSharedState = function yyGetSharedState() {
        return sharedState_yy;
    };








    function shallow_copy_noclobber(dst, src) {
        for (var k in src) {
            if (typeof dst[k] === 'undefined' && Object.prototype.hasOwnProperty.call(src, k)) {
                dst[k] = src[k];
            }
        }
    }

    // copy state
    shallow_copy_noclobber(sharedState_yy, this.yy);

    sharedState_yy.lexer = lexer;
    sharedState_yy.parser = this;






    // Does the shared state override the default `parseError` that already comes with this instance?
    if (typeof sharedState_yy.parseError === 'function') {
        this.parseError = function parseErrorAlt(str, hash, ExceptionClass) {
            if (!ExceptionClass) {
                ExceptionClass = this.JisonParserError;
            }
            return sharedState_yy.parseError.call(this, str, hash, ExceptionClass);
        };
    } else {
        this.parseError = this.originalParseError;
    }

    // Does the shared state override the default `quoteName` that already comes with this instance?
    if (typeof sharedState_yy.quoteName === 'function') {
        this.quoteName = function quoteNameAlt(id_str) {
            return sharedState_yy.quoteName.call(this, id_str);
        };
    } else {
        this.quoteName = this.originalQuoteName;
    }

    // set up the cleanup function; make it an API so that external code can re-use this one in case of
    // calamities or when the `%options no-try-catch` option has been specified for the grammar, in which
    // case this parse() API method doesn't come with a `finally { ... }` block any more!
    //
    // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
    //       or else your `sharedState`, etc. references will be *wrong*!
    this.cleanupAfterParse = function parser_cleanupAfterParse(resultValue, invoke_post_methods, do_not_nuke_errorinfos) {
        var rv;

        if (invoke_post_methods) {
            var hash;

            if (sharedState_yy.post_parse || this.post_parse) {
                // create an error hash info instance: we re-use this API in a **non-error situation**
                // as this one delivers all parser internals ready for access by userland code.
                hash = this.constructParseErrorInfo(null /* no error! */, null /* no exception! */, null, false);
            }

            if (sharedState_yy.post_parse) {
                rv = sharedState_yy.post_parse.call(this, sharedState_yy, resultValue, hash);
                if (typeof rv !== 'undefined') resultValue = rv;
            }
            if (this.post_parse) {
                rv = this.post_parse.call(this, sharedState_yy, resultValue, hash);
                if (typeof rv !== 'undefined') resultValue = rv;
            }

            // cleanup:
            if (hash && hash.destroy) {
                hash.destroy();
            }
        }

        if (this.__reentrant_call_depth > 1) return resultValue;        // do not (yet) kill the sharedState when this is a reentrant run.

        // clean up the lingering lexer structures as well:
        if (lexer.cleanupAfterLex) {
            lexer.cleanupAfterLex(do_not_nuke_errorinfos);
        }

        // prevent lingering circular references from causing memory leaks:
        if (sharedState_yy) {
            sharedState_yy.lexer = undefined;
            sharedState_yy.parser = undefined;
            if (lexer.yy === sharedState_yy) {
                lexer.yy = undefined;
            }
        }
        sharedState_yy = undefined;
        this.parseError = this.originalParseError;
        this.quoteName = this.originalQuoteName;

        // nuke the vstack[] array at least as that one will still reference obsoleted user values.
        // To be safe, we nuke the other internal stack columns as well...
        stack.length = 0;               // fastest way to nuke an array without overly bothering the GC
        sstack.length = 0;

        vstack.length = 0;
        sp = 0;

        // nuke the error hash info instances created during this run.
        // Userland code must COPY any data/references
        // in the error hash instance(s) it is more permanently interested in.
        if (!do_not_nuke_errorinfos) {
            for (var i = this.__error_infos.length - 1; i >= 0; i--) {
                var el = this.__error_infos[i];
                if (el && typeof el.destroy === 'function') {
                    el.destroy();
                }
            }
            this.__error_infos.length = 0;


        }

        return resultValue;
    };






































































































































    // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
    //       or else your `lexer`, `sharedState`, etc. references will be *wrong*!
    this.constructParseErrorInfo = function parser_constructParseErrorInfo(msg, ex, expected, recoverable) {
        var pei = {
            errStr: msg,
            exception: ex,
            text: lexer.match,
            value: lexer.yytext,
            token: this.describeSymbol(symbol) || symbol,
            token_id: symbol,
            line: lexer.yylineno,

            expected: expected,
            recoverable: recoverable,
            state: state,
            action: action,
            new_state: newState,
            symbol_stack: stack,
            state_stack: sstack,
            value_stack: vstack,

            stack_pointer: sp,
            yy: sharedState_yy,
            lexer: lexer,
            parser: this,

            // and make sure the error info doesn't stay due to potential
            // ref cycle via userland code manipulations.
            // These would otherwise all be memory leak opportunities!
            //
            // Note that only array and object references are nuked as those
            // constitute the set of elements which can produce a cyclic ref.
            // The rest of the members is kept intact as they are harmless.
            destroy: function destructParseErrorInfo() {
                // remove cyclic references added to error info:
                // info.yy = null;
                // info.lexer = null;
                // info.value = null;
                // info.value_stack = null;
                // ...
                var rec = !!this.recoverable;
                for (var key in this) {
                    if (this.hasOwnProperty(key) && typeof key === 'object') {
                        this[key] = undefined;
                    }
                }
                this.recoverable = rec;
            }
        };
        // track this instance so we can `destroy()` it once we deem it superfluous and ready for garbage collection!
        this.__error_infos.push(pei);
        return pei;
    };













    function getNonTerminalFromCode(symbol) {
        var tokenName = self.getSymbolName(symbol);
        if (!tokenName) {
            tokenName = symbol;
        }
        return tokenName;
    }


    function lex() {
        var token = lexer.lex();
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }

        if (typeof Jison !== 'undefined' && Jison.lexDebugger) {
            var tokenName = self.getSymbolName(token || EOF);
            if (!tokenName) {
                tokenName = token;
            }

            Jison.lexDebugger.push({
                tokenName: tokenName,
                tokenText: lexer.match,
                tokenValue: lexer.yytext
            });
        }

        return token || EOF;
    }


    var state, action, r, t;
    var yyval = {
        $: true,
        _$: undefined,
        yy: sharedState_yy
    };
    var p;
    var yyrulelen;
    var this_production;
    var newState;
    var retval = false;


    try {
        this.__reentrant_call_depth++;

        lexer.setInput(input, sharedState_yy);



        vstack[sp] = null;
        sstack[sp] = 0;
        stack[sp] = 0;
        ++sp;





        if (this.pre_parse) {
            this.pre_parse.call(this, sharedState_yy);
        }
        if (sharedState_yy.pre_parse) {
            sharedState_yy.pre_parse.call(this, sharedState_yy);
        }

        newState = sstack[sp - 1];
        for (;;) {
            // retrieve state number from top of stack
            state = newState;               // sstack[sp - 1];

            // use default actions if available
            if (this.defaultActions[state]) {
                action = 2;
                newState = this.defaultActions[state];
            } else {
                // The single `==` condition below covers both these `===` comparisons in a single
                // operation:
                //
                //     if (symbol === null || typeof symbol === 'undefined') ...
                if (!symbol) {
                    symbol = lex();
                }
                // read action for current state and first input
                t = (table[state] && table[state][symbol]) || NO_ACTION;
                newState = t[1];
                action = t[0];











                // handle parse error
                if (!action) {
                    var errStr;
                    var errSymbolDescr = (this.describeSymbol(symbol) || symbol);
                    var expected = this.collect_expected_token_set(state);

                    // Report error
                    if (typeof lexer.yylineno === 'number') {
                        errStr = 'Parse error on line ' + (lexer.yylineno + 1) + ': ';
                    } else {
                        errStr = 'Parse error: ';
                    }
                    if (typeof lexer.showPosition === 'function') {
                        errStr += '
' + lexer.showPosition(79 - 10, 10) + '
';
                    }
                    if (expected.length) {
                        errStr += 'Expecting ' + expected.join(', ') + ', got unexpected ' + errSymbolDescr;
                    } else {
                        errStr += 'Unexpected ' + errSymbolDescr;
                    }
                    // we cannot recover from the error!
                    p = this.constructParseErrorInfo(errStr, null, expected, false);
                    retval = this.parseError(p.errStr, p, this.JisonParserError);
                    break;
                }


            }










            switch (action) {
            // catch misc. parse failures:
            default:
                // this shouldn't happen, unless resolve defaults are off
                if (action instanceof Array) {
                    p = this.constructParseErrorInfo('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol, null, null, false);
                    retval = this.parseError(p.errStr, p, this.JisonParserError);
                    break;
                }
                // Another case of better safe than sorry: in case state transitions come out of another error recovery process
                // or a buggy LUT (LookUp Table):
                p = this.constructParseErrorInfo('Parsing halted. No viable error recovery approach available due to internal system failure.', null, null, false);
                retval = this.parseError(p.errStr, p, this.JisonParserError);
                break;

            // shift:
            case 1:
                stack[sp] = symbol;
                vstack[sp] = lexer.yytext;

                sstack[sp] = newState; // push state

                if (typeof Jison !== 'undefined' && Jison.parserDebugger) {
                    var tokenName = self.getSymbolName(symbol || EOF);
                    if (!tokenName) {
                        tokenName = symbol;
                    }

                    Jison.parserDebugger.push({
                        action: 'shift',
                        text: lexer.yytext,
                        terminal: tokenName,
                        terminal_id: symbol
                    });
                }

                ++sp;
                symbol = 0;


                    // Pick up the lexer details for the current symbol as that one is not 'look-ahead' any more:










                




                continue;

            // reduce:
            case 2:
                this_production = this.productions_[newState - 1];  // `this.productions_[]` is zero-based indexed while states start from 1 upwards...
                yyrulelen = this_production[1];










                r = this.performAction.call(yyval, newState, sp - 1, vstack);

                if (yyrulelen && typeof Jison !== 'undefined' && Jison.parserDebugger) {
                    var prereduceValue = vstack.slice(sp - yyrulelen, sp);
                    var debuggableProductions = [];
                    for (var debugIdx = yyrulelen - 1; debugIdx >= 0; debugIdx--) {
                        var debuggableProduction = getNonTerminalFromCode(stack[sp - debugIdx]);
                        debuggableProductions.push(debuggableProduction);
                    }
                    // find the current nonterminal name (- nolan)
                    var currentNonterminalCode = this_production[0];     // WARNING: nolan's original code takes this one instead:   this.productions_[newState][0];
                    var currentNonterminal = getNonTerminalFromCode(currentNonterminalCode);

                    Jison.parserDebugger.push({
                        action: 'reduce',
                        nonterminal: currentNonterminal,
                        nonterminal_id: currentNonterminalCode,
                        prereduce: prereduceValue,
                        result: r,
                        productions: debuggableProductions,
                        text: yyval.$
                    });
                }

                if (typeof r !== 'undefined') {
                    retval = r;
                    break;
                }

                // pop off stack
                sp -= yyrulelen;

                // don't overwrite the `symbol` variable: use a local var to speed things up:
                var ntsymbol = this_production[0];    // push nonterminal (reduce)
                stack[sp] = ntsymbol;
                vstack[sp] = yyval.$;

                // goto new state = table[STATE][NONTERMINAL]
                newState = table[sstack[sp - 1]][ntsymbol];
                sstack[sp] = newState;
                ++sp;









                continue;

            // accept:
            case 3:
                retval = true;
                // Return the `$accept` rule's `$$` result, if available.
                //
                // Also note that JISON always adds this top-most `$accept` rule (with implicit,
                // default, action):
                //
                //     $accept: <startSymbol> $end
                //                  %{ $$ = $1; @$ = @1; %}
                //
                // which, combined with the parse kernel's `$accept` state behaviour coded below,
                // will produce the `$$` value output of the <startSymbol> rule as the parse result,
                // IFF that result is *not* `undefined`. (See also the parser kernel code.)
                //
                // In code:
                //
                //                  %{
                //                      @$ = @1;            // if location tracking support is included
                //                      if (typeof $1 !== 'undefined')
                //                          return $1;
                //                      else
                //                          return true;           // the default parse result if the rule actions don't produce anything
                //                  %}
                sp--;
                if (typeof vstack[sp] !== 'undefined') {
                    retval = vstack[sp];
                }

                if (typeof Jison !== 'undefined' && Jison.parserDebugger) {
                    Jison.parserDebugger.push({
                        action: 'accept',
                        text: retval
                    });
                    console.log(Jison.parserDebugger[Jison.parserDebugger.length - 1]);
                }
                
                break;
            }

            // break out of loop: we accept or fail with error
            break;
        }
    } catch (ex) {
        // report exceptions through the parseError callback too, but keep the exception intact
        // if it is a known parser or lexer error which has been thrown by parseError() already:
        if (ex instanceof this.JisonParserError) {
            throw ex;
        }
        else if (lexer && typeof lexer.JisonLexerError === 'function' && ex instanceof lexer.JisonLexerError) {
            throw ex;
        }
        else {
            p = this.constructParseErrorInfo('Parsing aborted due to exception.', ex, null, false);
            retval = this.parseError(p.errStr, p, this.JisonParserError);
        }
    } finally {
        retval = this.cleanupAfterParse(retval, true, true);
        this.__reentrant_call_depth--;

        if (typeof Jison !== 'undefined' && Jison.parserDebugger) {
            Jison.parserDebugger.push({
                action: 'return',
                text: retval
            });
            console.log(Jison.parserDebugger[Jison.parserDebugger.length - 1]);
        }
    }   // /finally

    return retval;
}

};
parser.originalParseError = parser.parseError;
parser.originalQuoteName = parser.quoteName;



function Parser() {
  this.yy = {};
}
Parser.prototype = parser;
parser.Parser = Parser;

return new Parser();
})();

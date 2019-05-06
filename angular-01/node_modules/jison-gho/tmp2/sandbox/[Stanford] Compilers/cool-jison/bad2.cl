
(*
 *  execute "coolc bad.cl" to see the error messages that the coolc parser
 *  generates
 *
 *  execute "myparser bad.cl" to see the error messages that your parser
 *  generates
 *)

(* no error *)
class A {
};

(* error:  b is not a type identifier *)
class b inherits A {
};

(* no error *)
class F1 {
};

(* error:  a is not a type identifier *)
class C inherits a {
};

(* no error *)
class F2 {
};

(* error:  keyword inherits is misspelled *)
class D inherts A {
};

(* no error *)
class F3 {
};

(* error:  closing brace is missing *)
class E inherits A {
;

(* no error *)
class F4 {
};

(* no error *)
class F5 {
};


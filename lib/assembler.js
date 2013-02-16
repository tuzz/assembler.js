var ASSEMBLER = {};

load("lib/assembler/base.js");
load("lib/assembler/io.js");
load("lib/assembler/parser.js");
load("lib/assembler/code.js");
load("lib/assembler/symbol_table.js");

if (typeof arguments !== "undefined") {
  ASSEMBLER.io.argv = arguments;
  ASSEMBLER.assemble();
}

test("hasMoreCommands returns true initially", function () {
  setInput("foo\nbar");
  var parser = new ASSEMBLER.Parser();

  ok(parser.hasMoreCommands());
});

test("hasMoreCommands return false after exhausting all lines", function () {
  setInput("foo\nbar");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  ok(parser.hasMoreCommands(), "line 1");

  parser.advance();
  ok(parser.hasMoreCommands(), "line 2");

  parser.advance();
  ok(!parser.hasMoreCommands(), "line 3");
});

test("commandType recognises A commands", function () {
  setInput("@123\n@foo");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.commandType(), "A_COMMAND", "@123");

  parser.advance();
  equal(parser.commandType(), "A_COMMAND", "@foo");
});

test("commandType recognises C commands", function () {
  setInput("M=D\nD=A\n0;JEQ\nM=D;JLE\nM;JNE");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.commandType(), "C_COMMAND", "M=D");

  parser.advance();
  equal(parser.commandType(), "C_COMMAND", "D=A");

  parser.advance();
  equal(parser.commandType(), "C_COMMAND", "0;JEQ");

  parser.advance();
  equal(parser.commandType(), "C_COMMAND", "M=D;JLE");

  parser.advance();
  equal(parser.commandType(), "C_COMMAND", "M;JNE");
});

test("commandType recognises L commands", function () {
  setInput("(foo)\n(LOOP)");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.commandType(), "L_COMMAND", "(foo)");

  parser.advance();
  equal(parser.commandType(), "L_COMMAND", "(LOOP)");
});

test("symbol recognises decimals", function () {
  setInput("@123\n@0\n(7)");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.symbol(), "123");

  parser.advance();
  equal(parser.symbol(), "0");

  parser.advance();
  equal(parser.symbol(), "7");
});

test("symbol recognises symbols", function () {
  setInput("@foo\n@R1\n(LOOP)\n(R0)");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.symbol(), "foo");

  parser.advance();
  equal(parser.symbol(), "R1");

  parser.advance();
  equal(parser.symbol(), "LOOP");

  parser.advance();
  equal(parser.symbol(), "R0");
});

test("dest returns the AMD (or null) mneumonic", function () {
  setInput("A=0\nM=1;JEQ\nD=A\nAM=A;JNE\nAMD=-1\n0;JGT");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.dest(), "A");

  parser.advance();
  equal(parser.dest(), "M");

  parser.advance();
  equal(parser.dest(), "D");

  parser.advance();
  equal(parser.dest(), "AM");

  parser.advance();
  equal(parser.dest(), "AMD");

  parser.advance();
  equal(parser.dest(), "null");
});

test("comp returns the ALU mneumonic from the pool of 18 commands", function () {
  setInput("A=0\nM=-1;JNE\nD=D\nAM=!A\n-D;JLT\nA+1;JGT\nM=D-A\nM=D&A\nAMD=D|A;JMP");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.comp(), "0");

  parser.advance();
  equal(parser.comp(), "-1");

  parser.advance();
  equal(parser.comp(), "D");

  parser.advance();
  equal(parser.comp(), "!A");

  parser.advance();
  equal(parser.comp(), "-D");

  parser.advance();
  equal(parser.comp(), "A+1");

  parser.advance();
  equal(parser.comp(), "D-A");

  parser.advance();
  equal(parser.comp(), "D&A");

  parser.advance();
  equal(parser.comp(), "D|A");
});

test("jump returns one of the jump mneumonics", function () {
  setInput("A=0;JEQ\nMD=D-1;JNE\n-1;JMP\nAMD=A&D;JLT\nA|D;JGE");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.jump(), "JEQ");

  parser.advance();
  equal(parser.jump(), "JNE");

  parser.advance();
  equal(parser.jump(), "JMP");

  parser.advance();
  equal(parser.jump(), "JLT");

  parser.advance();
  equal(parser.jump(), "JGE");
});

test("it removes whitespace and empty lines", function () {
  setInput("\n\n A M   D  = A - 1 ; J    M P  \n\n\n @ 1 1  1 \n\n");
  var parser = new ASSEMBLER.Parser();

  ok(parser.hasMoreCommands());
  parser.advance();
  ok(parser.hasMoreCommands(), "line 1");

  equal(parser.commandType(), "C_COMMAND");
  equal(parser.dest(), "AMD");
  equal(parser.comp(), "A-1");
  equal(parser.jump(), "JMP");

  parser.advance();
  ok(parser.hasMoreCommands(), "line 2");

  equal(parser.commandType(), "A_COMMAND");
  equal(parser.symbol(), "111");

  parser.advance();
  ok(!parser.hasMoreCommands(), "line 3");
});

test("it removes comments", function () {
  setInput("// comment\n@123\n  // comment  ");
  var parser = new ASSEMBLER.Parser();

  parser.advance();
  equal(parser.symbol(), "123");

  parser.advance();
  ok(!parser.hasMoreCommands());
});

test("it adds and retrieves entries", function () {
  var symbolTable = new ASSEMBLER.SymbolTable();

  symbolTable.addEntry("foo", 123);
  symbolTable.addEntry("BAR", 321);

  equal(symbolTable.getAddress("BAR"), 321, 321);
  equal(symbolTable.getAddress("foo"), 123, 123);
});

test("contains checks if that symbol has been added", function () {
  var symbolTable = new ASSEMBLER.SymbolTable();

  symbolTable.addEntry("bar", 123);

  ok(!symbolTable.contains("foo"), "contains foo?");
  ok(symbolTable.contains("bar"), "contains bar?");

  symbolTable.addEntry("foo", 321);

  ok(symbolTable.contains("foo"), "contains foo?");
  ok(symbolTable.contains("bar"), "contains bar?");
});

test("addPredefined sets everything up as per the spec", function () {
  var symbolTable = new ASSEMBLER.SymbolTable();
  symbolTable.addPredefined();

  equal(symbolTable.getAddress("SP"),     0,     "SP");
  equal(symbolTable.getAddress("LCL"),    1,     "LCL");
  equal(symbolTable.getAddress("ARG"),    2,     "ARG");
  equal(symbolTable.getAddress("THIS"),   3,     "THIS");
  equal(symbolTable.getAddress("THAT"),   4,     "THAT");
  equal(symbolTable.getAddress("R0"),     0,     "R0");
  equal(symbolTable.getAddress("R1"),     1,     "R1");
  equal(symbolTable.getAddress("R15"),    15,    "R15");
  equal(symbolTable.getAddress("SCREEN"), 16384, "SCREEN");
  equal(symbolTable.getAddress("KBD"),    24576, "KBD");

  equal(symbolTable.getAddress("R16"),      undefined, "R16");
  equal(symbolTable.getAddress("ARGS"),     undefined, "ARGS");
  equal(symbolTable.getAddress("KEYBOARD"), undefined, "KEYBOARD");
});

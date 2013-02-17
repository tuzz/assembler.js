ASSEMBLER.assemble = function () {
  var parser = new ASSEMBLER.Parser();
  var symbolTable = new ASSEMBLER.SymbolTable();
  var words = [], word;
  var ramAddress = 16;

  var aBinary = function (symbol) {
    if (isNaN(symbol)) {
      if (symbolTable.contains(symbol)) {
        symbol = symbolTable.getAddress(symbol);
      }
      else {
        symbolTable.addEntry(symbol, ramAddress);
        symbol = ramAddress;
        ramAddress++;
      }
    }

    var binary = parseInt(symbol).toString(2);
    var pad = 16 - binary.length;
    var zeros = Array(pad).join("0");

    return "0" + zeros + binary;
  };

  var cBinary = function (dest, comp, jump) {
    var code = ASSEMBLER.code;
    var d, c, j;

    c = code.comp(comp);
    d = code.dest(dest);
    j = code.jump(jump);

    return "111" + c + d + j;
  };

  var eachLine = function (callback) {
    while (parser.hasMoreCommands()) {
      parser.advance();
      callback();
    }
  };

  var firstPass = function () {
    var lineNumber = 0;

    eachLine(function () {
      if (parser.commandType() == "L_COMMAND") {
        symbolTable.addEntry(parser.symbol(), lineNumber);
      }
      else {
        lineNumber++;
      }
    });
  };

  var secondPass = function () {
    var type;

    eachLine(function () {
      type = parser.commandType();

      if (type == "A_COMMAND") {
        word = aBinary(parser.symbol());
        words.push(word);
      }
      else if (type == "C_COMMAND") {
        word = cBinary(parser.dest(), parser.comp(), parser.jump());
        words.push(word);
      }
    });
  };

  symbolTable.addPredefined();
  firstPass();
  parser.reset();
  secondPass();
  ASSEMBLER.io.write(words.join("\n"));
};

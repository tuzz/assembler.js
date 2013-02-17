ASSEMBLER.assemble = function () {
  var parser = new ASSEMBLER.Parser();
  var words = [], word;

  var aBinary = function (symbol) {
    var binary = parseInt(symbol).toString(2);
    var pad = 16 - binary.length;
    var zeros = Array(pad).join("0");

    return "0" + zeros + binary;
  };

  var cBinary = function (dest, comp, jump) {
    var code = ASSEMBLER.code;
    var d, c, j;

    d = code.dest(dest);
    c = code.comp(comp);
    j = code.jump(jump);

    return "111" + c + d + j;
  };

  while (parser.hasMoreCommands()) {
    parser.advance();

    var type = parser.commandType();
    if (type == "A_COMMAND") {
      word = aBinary(parser.symbol());
      words.push(word);
    }
    else if (type == "C_COMMAND") {
      word = cBinary(parser.dest(), parser.comp(), parser.jump());
      words.push(word);
    }
    else {
      // Do something about pseudo instructions.
    }
  }

  ASSEMBLER.io.write(words.join("\n"));
};

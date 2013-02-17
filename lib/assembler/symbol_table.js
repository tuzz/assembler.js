ASSEMBLER.SymbolTable = function () {
  var table = {}, that = this;

  this.addEntry = function (symbol, address) {
    table[symbol] = address;
  };

  this.contains = function (symbol) {
    return table.hasOwnProperty(symbol);
  };

  this.getAddress = function (symbol) {
    return table[symbol];
  };

  this.addPredefined = function (symbol) {
    that.addEntry("SP",     0);
    that.addEntry("LCL",    1);
    that.addEntry("ARG",    2);
    that.addEntry("THIS",   3);
    that.addEntry("THAT",   4);
    that.addEntry("SCREEN", 16384);
    that.addEntry("KBD",    24576);

    var i;
    for (i = 0; i < 16; i++) {
      that.addEntry("R" + i, i);
    }
  };
};

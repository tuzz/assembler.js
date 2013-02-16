ASSEMBLER.Parser = function () {
  var input = ASSEMBLER.io.read();
  var lines = input.split("\n"), line;
  var index = -1;

  // public

  this.hasMoreCommands = function () {
    return (line || index < 0);
  };

  this.advance = function () {
    index++;
    line = lines[index];
  };

  this.commandType = function () {
    var a = aInstruction().symbol;
    var l = pseudo().symbol;

    return a ? "A_COMMAND" : l ? "L_COMMAND" : "C_COMMAND";
  };

  this.symbol = function () {
    return aInstruction().symbol || pseudo().symbol;
  };

  this.dest = function () {
    return cInstruction().dest || "null";
  };

  this.comp = function () {
    return cInstruction().comp;
  };

  this.jump = function () {
    return cInstruction().jump || "null";
  };

  // private

  var cInstruction = function () {
    var fragments = line.split(/=|;/);
    var d, c, j;

    if (line.indexOf("=") >= 0) {
      d = fragments[0];
      c = fragments[1];
      j = fragments[2];
    }
    else {
      c = fragments[0];
      j = fragments[1];
    }

    return { dest: d, comp: c, jump: j };
  };

  var aInstruction = function () {
    var matcher = /@(.*)/, s;
    var capture = matcher.exec(line);
    if (capture) { s = capture[1]; }

    return { symbol: s };
  };

  var pseudo = function () {
    var matcher = /\((.*?)\)/, s;
    var capture = matcher.exec(line);
    if (capture) { s = capture[1]; }

    return { symbol: s };
  };

};

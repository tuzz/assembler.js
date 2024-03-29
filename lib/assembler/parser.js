ASSEMBLER.Parser = function () {
  this.hasMoreCommands = function () {
    return !!lines[index + 1];
  };

  this.advance = function () {
    index++;
    line = lines[index];
  };

  this.reset = function () {
    index = -1;
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
    return (cInstruction().dest || "null").trim();
  };

  this.comp = function () {
    return cInstruction().comp.trim();
  };

  this.jump = function () {
    return (cInstruction().jump || "null").trim();
  };

  // private

  var cInstruction = function () {
    var fragments = line.split(/\=|;/);
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

  var filter = function (input) {
    var s = input;

    s = s.replace(/ +/g, "");     // whitespace
    s = s.replace(/\/\/.*/g, ""); // comments
    s = s.replace(/\n+/g, "\n");  // newlines
    s = s.trim();

    return s;
  };

  var input = filter(ASSEMBLER.io.read());
  var lines = input.split("\n"), line;
  var index = -1;
};

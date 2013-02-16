ASSEMBLER.Parser = function () {
  var input = ASSEMBLER.io.read();
  var lines = input.split("\n");
  var line = -1;

  var aMatcher = /@(.*)/;
  var lMatcher = /\((.*?)\)/;

  var currentLine = function () {
    return lines[line];
  };

  this.hasMoreCommands = function () {
    return (currentLine() || line == -1);
  };

  this.advance = function () {
    line++;
  };

  this.commandType = function () {
    if (aMatcher.test(currentLine())) {
      return "A_COMMAND";
    }
    else if (lMatcher.test(currentLine())) {
      return "L_COMMAND";
    }
    else {
      return "C_COMMAND";
    }
  };

  this.symbol = function () {
    var aCapture = aMatcher.exec(currentLine());
    var lCapture = lMatcher.exec(currentLine());

    if (aCapture) {
      return aCapture[1];
    }
    else {
      return lCapture[1];
    }
  };

  this.dest = function () {
    var destMatcher = /(.*?)=/;
    var destCapture = destMatcher.exec(currentLine());

    if (destCapture) {
      return destCapture[1];
    }
    else {
      return "null";
    }
  };

  this.comp = function () {
    var s1 = currentLine().split("=");
    var s2 = s1[s1.length - 1].split(";");

    return s2[0];
  };

  this.jump = function () {
    var s1 = currentLine().split("=");
    var s2 = s1[s1.length - 1].split(";");

    if (s2[1]) {
      return s2[1];
    }
    else {
      return "null";
    }
  };
};

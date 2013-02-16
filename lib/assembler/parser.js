ASSEMBLER.Parser = function () {
  var input = ASSEMBLER.io.read();
  var lines = input.split("\n");

  var index = -1;
  var line;

  var aMatcher = /@(.*)/;
  var lMatcher = /\((.*?)\)/;

  this.hasMoreCommands = function () {
    return (line || index < 0);
  };

  this.advance = function () {
    index++;
    line = lines[index];
  };

  this.commandType = function () {
    if (aMatcher.test(line)) {
      return "A_COMMAND";
    }
    else if (lMatcher.test(line)) {
      return "L_COMMAND";
    }
    else {
      return "C_COMMAND";
    }
  };

  this.symbol = function () {
    var aCapture = aMatcher.exec(line);
    var lCapture = lMatcher.exec(line);

    if (aCapture) {
      return aCapture[1];
    }
    else {
      return lCapture[1];
    }
  };

  this.dest = function () {
    var destMatcher = /(.*?)=/;
    var destCapture = destMatcher.exec(line);

    if (destCapture) {
      return destCapture[1];
    }
    else {
      return "null";
    }
  };

  this.comp = function () {
    var s1 = line.split("=");
    var s2 = s1[s1.length - 1].split(";");

    return s2[0];
  };

  this.jump = function () {
    var s1 = line.split("=");
    var s2 = s1[s1.length - 1].split(";");

    if (s2[1]) {
      return s2[1];
    }
    else {
      return "null";
    }
  };
};
